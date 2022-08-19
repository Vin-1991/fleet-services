from .views import UploadFileView, DownloadCleanedDataView
from .constants import UPLOAD_FILE_ENDPOINT, DOWNLOAD_FILE_ENDPOINT


def initialize_data_acquisition_cleaning_api_urls(api) -> None:

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
