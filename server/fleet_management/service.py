__all__ = [
    "MostPopularStationsService",
    "StationsMostTurnOverRateService",
    "DistributionBikeRentalDurationService",
]

import pandas as pd
from typing import List

from fleet_management.constants import (
    MOST_POPULAR_STATIONS_QUERY,
    STATION_TURN_OVER_RATE_QUERY,
    STATION_MAP_DATA_QUERY,
)
from utils.db_utils import (
    run_query_get_df,
)
from utils.utils import load_json_response


class MostPopularStationsService:
    """
    This service class creates a dict for most popualr stations data.
    Parameters
    ----------
        None

    Returns
    -------
        stations_data : dict
            returns a converted dict from dataframe.

    """

    def prepare_stations_data() -> dict:

        df_stations_data: pd.DataFrame = run_query_get_df(MOST_POPULAR_STATIONS_QUERY)

        uniq_week_days: List = df_stations_data["week_day"].unique()

        store_stations_data: dict = {}
        stations_data: List = []
        for days in uniq_week_days:
            for station_name, bike_count in zip(
                df_stations_data["start_station_name"], df_stations_data["bikes_count"]
            ):
                store_stations_data.update({"week_day": days, station_name: bike_count})
        stations_data += [store_stations_data]
        return stations_data


class StationsMostTurnOverRateService:
    """
    This service class creates a dict for stations having most turn over rate.
    Parameters
    ----------
        None

    Returns
    -------
        rate_data : dict
            returns a converted dict from dataframe.

    """

    def prepare_stations_turnover_data() -> dict:

        df_stations_data: pd.DataFrame = run_query_get_df(
            STATION_TURN_OVER_RATE_QUERY.format(number_of_rows=10)
        )
        rate_data: List = []

        for idx, df in df_stations_data.iterrows():
            trimmed_name: str = df["name"].split(",")[0].strip()
            rate_data += [
                {
                    "number_of_trips": df["number_of_trips"],
                    trimmed_name: df["avg_trip_duration_minutes"],
                }
            ]

        return rate_data


class DistributionBikeRentalDurationService:
    """
    This service class creates a dict for distribuion of bike rental duration..
    Parameters
    ----------
        None

    Returns
    -------
        distribution_data : dict
            returns a converted dict from dataframe.

    """

    def prepare_distribution_duration_data() -> dict:

        df_distribution_data: pd.DataFrame = run_query_get_df(
            STATION_TURN_OVER_RATE_QUERY.format(number_of_rows=100)
        )
        distribution_data: List = []

        for idx, df in df_distribution_data.iterrows():
            distribution_data += [
                {
                    "number_of_trips": df["number_of_trips"],
                    "duartion": df["avg_trip_duration_minutes"],
                }
            ]

        return distribution_data


class StationsMpaDataService:
    """
    This service class creates a json response for stations location on a map.
    Parameters
    ----------
        None

    Returns
    -------
        load_json_response : dict
            returns a converted json from dataframe.

    """

    def prepare_stations_map_data() -> dict:

        df_stations_map_data: pd.DataFrame = run_query_get_df(STATION_MAP_DATA_QUERY)
        return load_json_response(df_stations_map_data.to_json(orient="records"))
