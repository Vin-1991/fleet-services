from fleet_management.views import (
    MostPopularStationsView,
    StationsMostTurnOverRateView,
    DistributionBikeRentalDurationView,
)
from fleet_management.constants import (
    TOP_TEN_POPULAR_STATIONS_ENDPOINT,
    STATIONS_MOST_TURNOVER_RATE_ENDPOINT,
    DISTRIBUTION_BIKE_RENTAL_DURATION_ENDPOINT,
)


def initialize_fleet_management_api_urls(api) -> None:

    """
    This method initialize the consolidator API URLs.
    Parameters
    ----------
        api

    Returns
    -------
        None
    """
    api.add_resource(MostPopularStationsView, TOP_TEN_POPULAR_STATIONS_ENDPOINT)
    api.add_resource(StationsMostTurnOverRateView, STATIONS_MOST_TURNOVER_RATE_ENDPOINT)
    api.add_resource(
        DistributionBikeRentalDurationView, DISTRIBUTION_BIKE_RENTAL_DURATION_ENDPOINT
    )
