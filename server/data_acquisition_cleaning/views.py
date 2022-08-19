__all__ = []
import werkzeug
from flask import send_file
from flask_restful import Resource, reqparse

from bicycle_hires.constants import (
    INPUT_FILE_REQUIRED,
    INPUT_FILE_ERROR,
    TABLE_NAME_REQUIRED,
    BICYCLE_HIRE_TABLE_COLUMNS,
    DOWNLOAD_FILE_ERROR,
)
from bicycle_hires.service import DownloadCleanedDataViewService
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
    parser.add_argument("table_name", type=str, required=True, help=TABLE_NAME_REQUIRED)

    def post(self):
        args = self.parser.parse_args()
        input_file = args["input_file"]
        table_name = args["table_name"]
        try:
            file_uploaded = ingest_file_to_db(
                input_file,
                table_name,
            )
        except Exception as e:
            error_message = {"error_message": f"{INPUT_FILE_ERROR + ' => ' + str(e)}"}
            return make_json_response(error_message, 500)

        return make_json_response({"message": file_uploaded}, 200)


class DownloadCleanedDataView(Resource):
    def get(self, table_name):
        try:
            export_file_path = DownloadCleanedDataViewService.export_cleaned_file()
            file_obj = send_file(path_or_file=export_file_path, mimetype="text/csv")
            delete_created_csv(export_file_path)
            
        except Exception as e:
            error_message = {
                "error_message": f"{DOWNLOAD_FILE_ERROR + ' => ' + str(e)}"
            }
            return make_json_response(error_message, 500)

        return file_obj
