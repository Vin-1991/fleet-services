from data_acquisition_cleaning.urls import initialize_data_acquisition_cleaning_api_urls


def initialize_api_routes(api) -> None:
    """
    This method initialize the all the API URLs.
    Parameters
    ----------
        api

    Returns
    -------
        None
    """
    initialize_data_acquisition_cleaning_api_urls(api)
