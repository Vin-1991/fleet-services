__all__ = [
    "create_timestamp",
    "make_json_response",
    "load_json_response",
    "read_file",
    "get_dataset_name",
    "ingest_data_to_db",
]

import time
import os
import json
import pandas as pd
from datetime import datetime
from flask import jsonify, make_response

from utils.db_utils import create_connection_sql
from utils.constants import (
    FILE_READ_ERROR,
    INGEST_DATA_ERROR,
    INGEST_DATA_SUCCESS_MESSAGE,
)
from data_acquisition_cleaning.constants import DATASETS


def create_timestamp() -> datetime:
    """
    This method crates a timestamp in ":%Y-%m-%d_%H-%M-%S" format .
    Parameters
    ----------
    None

    Returns
    -------
        returns datetime

    """
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


def load_json_response(response: dict) -> dict:
    """
    This method converts a response into json response.
    Parameters
    ----------
        response : dict
            response in the form dictionary

    Returns
    -------
        json_loads : dict
            returns a converted json response.

    """
    return json.loads(response)


def read_file(input_file: str) -> pd.DataFrame:
    """
    This method reads a file and convert into a dataframe.
    Parameters
    ----------
        input_file : str
            input file path

    Returns
    -------
        data_frame : pd.DataFrame
            returns a data frame.

    """
    try:
        data_frame = pd.read_csv(
            input_file,
            escapechar="\\",
        )
    except Exception as e:
        return FILE_READ_ERROR

    return data_frame


def delete_created_csv(export_file_path: str) -> None:
    """
    This method takes a file path and delete it silently via thread.
    Parameters
    ----------
        export_file_path : str
            exported file path

    Returns
    -------
        None

    """
    try:
        for idx in range(1):
            time.sleep(2)
        os.remove(export_file_path)
    except Exception as e:
        return "Cannot delete the file.."


def get_dataset_name(dataset_id: str) -> str:
    """
    This method takes a dataset id convert it to int and extract the dataset name.
    Parameters
    ----------
        dataset_id : str
            data set id.

    Returns
    -------
        dataset_name : str
            dataset_name as string

    """
    dataset_id = int(dataset_id)
    return DATASETS[dataset_id]


def ingest_data_to_db(df: pd.DataFrame, table_name: str) -> str:
    """
    This method ingest the file data,which was converted to dataframe in the passed table.
    Parameters
    ----------
        df : pd.DataFrame
            file data converted to data frame
        table_name : str
            table name of selected dataset

    Returns
    -------
        message : str
            success message

    """

    try:
        with create_connection_sql() as connection:
            df.to_sql(table_name, con=connection, index=False, if_exists="replace")

    except Exception as e:
        return INGEST_DATA_ERROR

    return INGEST_DATA_SUCCESS_MESSAGE
