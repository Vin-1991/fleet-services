from typing import List
import pandas as pd
from repository.db import db


def create_connection_sql():
    return db.engine.connect()


def run_query_get_df(query, chunkSize=None):
    with create_connection_sql() as conn:
        if not chunkSize:
            df = pd.read_sql_query(query, conn)
        else:
            df = pd.read_sql_query(query, conn, chunksize=chunkSize)
        return df
