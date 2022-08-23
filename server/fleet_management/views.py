__all__ = [
    "MostPopularStationsView",
    "StationsMostTurnOverRateView",
    "DistributionBikeRentalDurationView",
    "StationsMapDataView",
    "DistanceBetweenTwoStationsDataView",
]

from typing import List
from flask_restful import Resource

from fleet_management.constants import (
    POPULAR_STATION_DATA_ERROR,
    STATIONS_MOST_TURNOVER_RATE_DATA_ERROR,
    DISTRIBUTION_BIKE_RENTAL_DURATION_DATA_ERROR,
    STATIONS_MAP_DATA_ERROR,
    DISTANCE_BETWEEN_TWO_STATIONS_DATA_ERROR,
)
from fleet_management.service import (
    MostPopularStationsService,
    StationsMostTurnOverRateService,
    DistributionBikeRentalDurationService,
    StationsMapDataService,
    DistanceBetweenTwoStationsDataDataService,
)
from utils.utils import make_json_response


class MostPopularStationsView(Resource):
    """
    This GET view creates a json response for most popular stations.
    Parameters
    ----------
        None

    Returns
    -------
        make_response : dict
           returns a converted json response with a HTTP status code.

    """

    def get(self) -> dict:
        try:
            stations_data: List[
                dict
            ] = MostPopularStationsService.prepare_stations_data()
        except Exception as e:
            error_message: dict = {
                "error_message": f"{POPULAR_STATION_DATA_ERROR + ' => ' + str(e)}"
            }
            return make_json_response(error_message, 500)

        return make_json_response(stations_data, 200)


class StationsMostTurnOverRateView(Resource):
    """
    This GET view creates a json response for stations which are having most trun over rate.
    Parameters
    ----------
        None

    Returns
    -------
        make_response : dict
            returns a converted json response with a HTTP status code.

    """

    def get(self) -> dict:
        try:
            stations_turnover_data: List[
                dict
            ] = StationsMostTurnOverRateService.prepare_stations_turnover_data()
        except Exception as e:
            error_message: dict = {
                "error_message": f"{STATIONS_MOST_TURNOVER_RATE_DATA_ERROR + ' => ' + str(e)}"
            }
            return make_json_response(error_message, 500)

        return make_json_response(stations_turnover_data, 200)


class DistributionBikeRentalDurationView(Resource):
    """
    This GET view creates a json response for distribuion of bike rental duration.
    Parameters
    ----------
       None

    Returns
    -------
        make_response : dict
            returns a converted json response with a HTTP status code.

    """

    def get(self) -> dict:
        try:
            distribution_data: List[
                dict
            ] = (
                DistributionBikeRentalDurationService.prepare_distribution_duration_data()
            )
        except Exception as e:
            error_message: dict = {
                "error_message": f"{DISTRIBUTION_BIKE_RENTAL_DURATION_DATA_ERROR + ' => ' + str(e)}"
            }
            return make_json_response(error_message, 500)

        return make_json_response(distribution_data, 200)


class StationsMapDataView(Resource):
    """
    This GET view creates a json response for stations location for a map.
    Parameters
    ----------
        None

    Returns
    -------
        make_response : dict
            returns a converted json response with a HTTP status code.

    """

    def get(self) -> dict:
        try:
            stations_turnover_data: List[
                dict
            ] = StationsMapDataService.prepare_stations_map_data()
        except Exception as e:
            error_message: dict = {
                "error_message": f"{STATIONS_MAP_DATA_ERROR + ' => ' + str(e)}"
            }
            return make_json_response(error_message, 500)

        return make_json_response(stations_turnover_data, 200)


class DistanceBetweenTwoStationsDataView(Resource):
    """
    This GET view creates a json response for average distance between two stations.
    Parameters
    ----------
        None

    Returns
    -------
        make_response : dict
            returns a converted json response with a HTTP status code.

    """

    def get(self) -> dict:
        try:
            distance_data: List[
                dict
            ] = (
                DistanceBetweenTwoStationsDataDataService.prepare_stations_distance_data()
            )
        except Exception as e:
            error_message: dict = {
                "error_message": f"{DISTANCE_BETWEEN_TWO_STATIONS_DATA_ERROR + ' => ' + str(e)}"
            }
            return make_json_response(error_message, 500)

        return make_json_response(distance_data, 200)
