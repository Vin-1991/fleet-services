from bicycle_hires.views import UploadFileView,DownloadCleanedDataView
from bicycle_hires.constants import UPLOAD_FILE_ENDPOINT,DOWNLOAD_FILE_ENDPOINT


def initialize_bicycle_hires_api_urls(api) -> None:

    """
    This method initialize the consolidator API URLs.
    Parameters
    ----------
        api

    Returns
    -------
        None
    """
    api.add_resource(UploadFileView, UPLOAD_FILE_ENDPOINT)
    api.add_resource(DownloadCleanedDataView, DOWNLOAD_FILE_ENDPOINT)
