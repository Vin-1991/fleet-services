__all__ = ["create_connection_sql", "run_query_get_df"]


import pandas as pd
from repository.db import db


def create_connection_sql():
    """
    This method creates a connection with the DB.
    Parameters
    ----------
        None
    Returns
    -------
        None
    """
    return db.engine.connect()


def run_query_get_df(query: str, chunkSize: int = None) -> pd.DataFrame:
    """
    This method reads query and creates a dataframe by running it via connection method.
    Parameters
    ----------
        query : str
            passed query to execute and get result
        chunkSize : int
            chunk szie to read the file in chunks in case the file size is huge. Defaults to None.
    Returns
    -------
        df : pd.DataFrame
            created dataframe of data from the query
    """
    with create_connection_sql() as conn:
        if not chunkSize:
            df = pd.read_sql_query(query, conn)
        else:
            df = pd.read_sql_query(query, conn, chunksize=chunkSize)
        return df
