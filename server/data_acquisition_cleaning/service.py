__all__ = [
    "DownloadCleanedDataViewService",
    "ProcessedDataService",
    "DataMassagingService",
]

import os
import pandas as pd

from .constants import (
    DOWNLOAD_CLEANED_FILE_QUERY,
    BICYCLE_HIRES_MANDATORY_COLUMNS,
    BICYCLE_STATIONS_MANDATORY_COLUMNS,
    DATASET_COLUMNS_BICYCLE_HIRES_TYPE_MAPPING,
    DATASET_COLUMNS_BICYCLE_STATIONS_TYPE_MAPPING,
)
from config.settings import FILE_PATH_EXPORT_FILE
from utils.db_utils import (
    run_query_get_df,
)
from utils.utils import create_timestamp, load_json_response


class DownloadCleanedDataViewService:
    """
    This service class creates a data frame of the file, creates and save it in the 'data-files' folder.
    Parameters
    ----------
        dataset : str
            dataset id.

    Returns
    -------
        file_path : str
            returns a file path for download.

    """

    def export_cleaned_file(dataset: str) -> str:

        df_download_file: pd.DataFrame = run_query_get_df(
            DOWNLOAD_CLEANED_FILE_QUERY.format(table_name=dataset)
        )

        file_name: str = f"cleaned_{dataset}_{create_timestamp()}.csv"
        file_path: os.PathLike = os.path.abspath(f"{FILE_PATH_EXPORT_FILE}{file_name}")

        isExist: bool = os.path.exists(FILE_PATH_EXPORT_FILE)

        if not isExist:
            os.makedirs(FILE_PATH_EXPORT_FILE)

        df_download_file.to_csv(file_path, index=False)

        return file_path


class ProcessedDataService:
    """
    This service class creates a processed data, data frame of the file and load it as a json response.
    Parameters
    ----------
        dataset_name : str
            name of the selected dataset
        dataset_id : str
            select dataset id.

    Returns
    -------
        load_json_response : dict
            returns a json response of processed data.

    """

    def get_processed_data(dataset_name: str, dataset_id: str) -> dict:
        df_processed_data: pd.DataFrame = run_query_get_df(
            DOWNLOAD_CLEANED_FILE_QUERY.format(table_name=dataset_name)
        )
        datetime_columns: pd.DataFrame = df_processed_data.select_dtypes(
            include=["datetime64"]
        )
        for col in datetime_columns.columns:
            df_processed_data[col] = df_processed_data[col].dt.strftime(
                "%Y-%m-%d %H:%M:%S"
            )
        return load_json_response(df_processed_data.to_json(orient="records"))


class DataMassagingService:
    """
    This service class process the file data.
        - Checks all the anomalies in the file.
        - Detect the dtypes of the columns and convert them in to the appropriate one.
        - Check if the there are Null values in the manadatory columns. If yes then drop those rows.
        - Check if there are duplicate rows and mark unique identifier.

    Parameters
    ----------
        df : pd.DataFrame
            dataframe of the uploaded file
        dataset_id : int
            selected dataset id in for which file data needs to be processed

    Returns
    -------
        df : pd.DataFrame
            returns a processed dataframe.

    """

    @classmethod
    def massage_cleanse_data(cls, df: pd.DataFrame, dataset_id: int) -> None:
        dataset_details: dict = cls.get_dataset_related_details(dataset_id)
        # check if there are null values in mandatory columns
        df = df.dropna(how="any", subset=dataset_details["mandatory_columns"])

        # check if there are duplicate rows and mark unique identifier
        if not df[dataset_details["unique_column"]].is_unique:
            df = df.drop_duplicates(
                subset=[dataset_details["unique_column"]], keep="first"
            )

        # set the dtype for columns
        dataset_columns_list: dict = dataset_details["dataset_column_mappings"]
        for type in dataset_columns_list:
            if dataset_columns_list[type] == "int":
                df[type] = pd.to_numeric(df[type], errors="coerce")
            elif dataset_columns_list[type] == "float":
                df[type] = df[type].astype(float)
            elif dataset_columns_list[type] == "bool":
                df[type] = df[type].astype(bool)
                df[type] = df[type].apply(lambda x: "Yes" if x == True else "No")
            elif dataset_columns_list[type] == "str":
                df[type] = df[type].astype("category")
            elif dataset_columns_list[type] == "timestamp":
                df[type] = pd.to_datetime(df[type], errors="coerce")
                df = df.dropna()
            elif dataset_columns_list[type] == "date":
                df[type] = pd.to_datetime(df[type], errors="coerce")

        return df

    def get_dataset_related_details(dataset_id: int) -> dict:
        store_details: dict = {}
        if dataset_id == 1:
            store_details = {
                "mandatory_columns": BICYCLE_HIRES_MANDATORY_COLUMNS,
                "unique_column": "rental_id",
                "dataset_column_mappings": DATASET_COLUMNS_BICYCLE_HIRES_TYPE_MAPPING,
            }
        elif dataset_id == 2:
            store_details = {
                "mandatory_columns": BICYCLE_STATIONS_MANDATORY_COLUMNS,
                "unique_column": "id",
                "dataset_column_mappings": DATASET_COLUMNS_BICYCLE_STATIONS_TYPE_MAPPING,
            }

        return store_details
