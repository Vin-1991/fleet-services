__all__ = []

import os
import pandas as pd

from typing import List

from .constants import (
    FILE_PATH_EXPORT_FILE,
    DOWNLOAD_CLEANED_FILE_QUERY,
    BICYCLE_HIRES_MANDATORY_COLUMNS,
    BICYCLE_STATIONS_MANDATORY_COLUMNS,
    DATASET_COLUMNS_BICYCLE_HIRES_TYPE_MAPPING,
    DATASET_COLUMNS_BICYCLE_STATIONS_TYPE_MAPPING,
)
from utils.db_utils import (
    run_query_get_df,
)
from utils.utils import create_timestamp, load_json_response


class DownloadCleanedDataViewService:
    def export_cleaned_file(dataset: str) -> str:

        df_download_file: pd.DataFrame = run_query_get_df(
            DOWNLOAD_CLEANED_FILE_QUERY.format(table_name=dataset)
        )

        file_name: str = f"cleaned_{dataset}_{create_timestamp()}.csv"
        file_path: os.PathLike = f"{FILE_PATH_EXPORT_FILE}{file_name}"

        isExist: bool = os.path.exists(FILE_PATH_EXPORT_FILE)

        if not isExist:
            os.makedirs(FILE_PATH_EXPORT_FILE)

        df_download_file.to_csv(file_path, index=False)

        return file_path


class ProcessedDataService:
    def get_processed_data(dataset) -> dict:
        df_processed_data: pd.DataFrame = run_query_get_df(
            DOWNLOAD_CLEANED_FILE_QUERY.format(table_name=dataset)
        )

        return load_json_response(df_processed_data.to_json(orient="records"))


class DataMassagingService:
    def massage_cleanse_data(df, dataset) -> None:
        # check if there are null values in mandatory columns
        df = df.dropna(how="any", subset=BICYCLE_HIRES_MANDATORY_COLUMNS)

        # check if there are duplicate rows and mark unique identifier
        if not df["rental_id"].is_unique:
            df = df.drop_duplicates(subset=["rental_id"], keep="first")

        # set the dtype for columns
        dataset_columns_list: dict = DATASET_COLUMNS_BICYCLE_HIRES_TYPE_MAPPING
        for type in dataset_columns_list:
            if dataset_columns_list[type] == "int":
                df[type] = pd.to_numeric(df[type], errors="coerce")
            elif dataset_columns_list[type] == "float":
                df[type] = df[type].astype(float)
            elif dataset_columns_list[type] == "bool":
                df[type] = df[type].astype(bool)
            elif dataset_columns_list[type] == "str":
                df[type] = df[type].astype("category")
            elif dataset_columns_list[type] == "timestamp":
                df[type] = pd.to_datetime(
                    df[type], format="%Y-%m-%d %H:%M:%S", errors="coerce"
                )
            elif dataset_columns_list[type] == "date":
                df[type] = pd.to_datetime(df[type], format="%Y-%m-%d", errors="coerce")
