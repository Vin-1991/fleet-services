import csv
import time
import os
import threading
import pandas as pd
from datetime import datetime
from flask import jsonify, make_response

from utils.db_utils import create_connection_sql
from utils.constants import UPLOAD_FILE_ERROR


def create_timestamp():
    return "{:%Y-%m-%d_%H-%M-%S}".format(datetime.now())


def make_json_response(response: dict, statuscode: int) -> dict:
    """
    This method converts a response into json response.
    Parameters
    ----------
        response : dict
            response in the form dictionary
        statuscode : int
            HTTP status code

    Returns
    -------
        make_response : dict
            returns a converted json response with a HTTP status code.

    """
    return make_response(jsonify(response), statuscode)


def ingest_file_to_db(input_file, table_name, table_columns) -> None:
    df = pd.read_csv(input_file)

    try:
        with create_connection_sql() as connection:
            df.to_sql(table_name, con=connection, index=False, if_exists="replace")
    except Exception as e:
        return UPLOAD_FILE_ERROR

    return "File uploaded successfully"


def delete_created_csv(export_file_path: str) -> None:

    try:
        for idx in range(1):
            time.sleep(2)
        os.remove(export_file_path)
    except Exception as e:
        return "Cannot delete the file.."
