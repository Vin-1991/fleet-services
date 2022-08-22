__all__ = []

from typing import List
from flask_restful import Resource, reqparse

from fleet_management.constants import (
    POPULAR_STATION_DATA_ERROR,
    STATIONS_MOST_TURNOVER_RATE_DATA_ERROR,
    DISTRIBUTION_BIKE_RENTAL_DURATION_DATA_ERROR
)
from fleet_management.service import (
    MostPopularStationsService,
    StationsMostTurnOverRateService,
    DistributionBikeRentalDurationService,
)
from utils.utils import make_json_response


class MostPopularStationsView(Resource):
    def get(self):
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
    def get(self):
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
    def get(self):
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
