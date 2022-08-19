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
)
from .service import DownloadCleanedDataViewService
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
        table_name = request.form.get("table_name")
        try:
            table_columns: List = []
            if table_name == "bicycle_hires":
                table_columns = BICYCLE_HIRE_TABLE_COLUMNS
            else:
                table_columns = []
            file_uploaded = ingest_file_to_db(input_file, table_name, table_columns)
        except Exception as e:
            error_message = {"error_message": f"{INPUT_FILE_ERROR + ' => ' + str(e)}"}
            return make_json_response(error_message, 500)

        return make_json_response({"message": file_uploaded}, 200)


class DownloadCleanedDataView(Resource):
    def get(self):
        table_name = request.args.get("table_name")
        try:
            export_file_path = DownloadCleanedDataViewService.export_cleaned_file(
                table_name
            )
            file_obj = send_file(path_or_file=export_file_path, mimetype="text/csv")
            thread = threading.Thread(target=delete_created_csv(export_file_path))
            thread.start()

        except Exception as e:
            error_message = {
                "error_message": f"{DOWNLOAD_FILE_ERROR + ' => ' + str(e)}"
            }
            return make_json_response(error_message, 500)

        return file_obj
