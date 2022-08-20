__all__ = []

import os
import pandas as pd

from typing import List

from .constants import FILE_PATH_EXPORT_FILE, DOWNLOAD_CLEANED_FILE_QUERY
from utils.db_utils import (
    run_query_get_df,
)
from utils.utils import create_timestamp, load_json_response


class DownloadCleanedDataViewService:
    def export_cleaned_file(table_name: str) -> str:

        df_download_file: pd.DataFrame = run_query_get_df(
            DOWNLOAD_CLEANED_FILE_QUERY.format(table_name=table_name)
        )

        file_name: str = f"cleaned_{table_name}_{create_timestamp()}.csv"
        file_path: os.PathLike = f"{FILE_PATH_EXPORT_FILE}{file_name}"

        isExist: bool = os.path.exists(FILE_PATH_EXPORT_FILE)

        if not isExist:
            os.makedirs(FILE_PATH_EXPORT_FILE)

        df_download_file.to_csv(file_path, index=False)

        return file_path


class ProcessedDataService:
    def get_processed_data(table_name) -> dict:
        df_processed_data: pd.DataFrame = run_query_get_df(
            DOWNLOAD_CLEANED_FILE_QUERY.format(table_name=table_name)
        )

        return load_json_response(df_processed_data.to_json(orient="records"))
