__all__ = []
import werkzeug
import threading
from typing import List
from flask import request, send_file
from flask_restful import Resource, reqparse

from .constants import (
    INPUT_FILE_REQUIRED,
    INPUT_FILE_ERROR,
    DOWNLOAD_FILE_ERROR,
    PROCESSED_DATA_ERROR,
    DATASETS,
)
from .service import DownloadCleanedDataViewService, ProcessedDataService
from bicycle_hires.constants import BICYCLE_HIRE_TABLE_COLUMNS
from utils.utils import make_json_response, ingest_file_to_db, delete_created_csv


class UploadFileView(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "input_file",
        type=werkzeug.datastructures.FileStorage,
        required=True,
        location="files",
        help=INPUT_FILE_REQUIRED,
    )

    def post(self):
        args = self.parser.parse_args()
        input_file = args["input_file"]
        dataset: str = request.form.get("dataset", "bicycle_hires")
        try:
            table_columns: List = []
            if dataset == "bicycle_hires":
                table_columns = BICYCLE_HIRE_TABLE_COLUMNS
            else:
                table_columns: List = []
            file_uploaded: str = ingest_file_to_db(input_file, dataset, table_columns)
        except Exception as e:
            error_message: dict = {
                "error_message": f"{INPUT_FILE_ERROR + ' => ' + str(e)}"
            }
            return make_json_response(error_message, 500)

        return make_json_response({"message": file_uploaded}, 200)


class DownloadCleanedDataView(Resource):
    def get(self):
        dataset: str = request.args.get("dataset")
        try:
            if dataset == "":
                dataset = "bicycle_hires"
            export_file_path: str = DownloadCleanedDataViewService.export_cleaned_file(
                dataset
            )
            file_obj = send_file(path_or_file=export_file_path, mimetype="text/csv")
            thread = threading.Thread(target=delete_created_csv(export_file_path))
            thread.start()

        except Exception as e:
            error_message: dict = {
                "error_message": f"{DOWNLOAD_FILE_ERROR + ' => ' + str(e)}"
            }
            return make_json_response(error_message, 500)

        return file_obj


class ProcessedDataView(Resource):
    def get(self):
        dataset: str = request.args.get("dataset")
        try:
            if dataset == "":
                dataset = "bicycle_hires"
            processed_data: dict = ProcessedDataService.get_processed_data(dataset)

        except Exception as e:
            error_message: dict = {
                "error_message": f"{PROCESSED_DATA_ERROR + ' => ' + str(e)}"
            }
            return make_json_response(error_message, 500)

        return processed_data


class DataSetListView(Resource):
    def get(self):
        try:
            data_set: List[dict] = []

            for idx, dts in enumerate(DATASETS):
                data_set += [{"key": idx + 1, "label": dts}]

        except Exception as e:
            error_message = {
                "error_message": f"{PROCESSED_DATA_ERROR + ' => ' + str(e)}"
            }
            return make_json_response(error_message, 500)

        return make_json_response(data_set, 200)
