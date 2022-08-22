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
from .service import (
    DownloadCleanedDataViewService,
    ProcessedDataService,
    DataMassagingService,
)
from utils.utils import (
    make_json_response,
    read_file,
    delete_created_csv,
    get_dataset_name,
    ingest_data_to_db,
)


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
        dataset: str = request.form.get("dataset")
        try:
            df = read_file(input_file)
            processed_df = DataMassagingService.massage_cleanse_data(df, int(dataset))
            ingest_data_to_db(processed_df, get_dataset_name(dataset))
        except Exception as e:
            error_message: dict = {
                "error_message": f"{INPUT_FILE_ERROR + ' => ' + str(e)}"
            }
            return make_json_response(error_message, 500)

        return make_json_response(
            {"message": "File cleaned, massaged and uploaded successfully"}, 200
        )


class DownloadCleanedDataView(Resource):
    def get(self):
        dataset: str = request.args.get("dataset")
        try:
            if dataset == "":
                dataset = "bicycle_hires"
            export_file_path: str = DownloadCleanedDataViewService.export_cleaned_file(
                get_dataset_name(dataset)
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
                dataset = "1"
            processed_data: dict = ProcessedDataService.get_processed_data(
                get_dataset_name(dataset)
            )

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

            for dts in DATASETS:
                data_set += [{"key": dts, "label": DATASETS[dts]}]

        except Exception as e:
            error_message = {
                "error_message": f"{PROCESSED_DATA_ERROR + ' => ' + str(e)}"
            }
            return make_json_response(error_message, 500)

        return make_json_response(data_set, 200)
