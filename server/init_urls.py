from bicycle_hires.urls import initialize_bicycle_hires_api_urls


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
    initialize_bicycle_hires_api_urls(api)
