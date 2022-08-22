__all__ = []

import pandas as pd
from typing import List

from fleet_management.constants import (
    MOST_POPULAR_STATIONS_QUERY,
    STATION_TURN_OVER_RATE_QUERY,
)
from utils.db_utils import (
    run_query_get_df,
)
from utils.utils import load_json_response


class MostPopularStationsService:
    def prepare_stations_data() -> dict:

        df_stations_data: pd.DataFrame = run_query_get_df(MOST_POPULAR_STATIONS_QUERY)

        uniq_week_days = df_stations_data["week_day"].unique()

        store = {}
        result = []
        for days in uniq_week_days:
            for station_name, bike_count in zip(
                df_stations_data["start_station_name"], df_stations_data["bikes_count"]
            ):
                store.update({"week_day": days, station_name: bike_count})
        result += [store]
        return result


class StationsMostTurnOverRateService:
    def prepare_stations_turnover_data() -> dict:

        df_stations_data: pd.DataFrame = run_query_get_df(
            STATION_TURN_OVER_RATE_QUERY.format(number_of_rows=10)
        )
        rate_data: List = []

        for idx, df in df_stations_data.iterrows():
            trimmed_name = df["name"].split(",")[0].strip()
            rate_data += [
                {
                    "number_of_trips": df["number_of_trips"],
                    trimmed_name: df["avg_trip_duration_minutes"],
                }
            ]

        return rate_data


class DistributionBikeRentalDurationService:
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
