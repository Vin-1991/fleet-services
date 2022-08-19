__all__ = []

from flask_restful import Resource, reqparse

from bicycle_hires.constants import *
from bicycle_hires.service import DownloadCleanedDataViewService
from utils.utils import make_json_response, ingest_file_to_db


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
