from .views import (
    UploadFileView,
    DownloadCleanedDataView,
    ProcessedDataView,
    DataSetListView,
)
from .constants import (
    UPLOAD_FILE_ENDPOINT,
    DOWNLOAD_FILE_ENDPOINT,
    PROCESSED_DATA_ENDPOINT,
    DATA_SETS_LIST_ENDPOINT,
)


def initialize_data_acquisition_cleaning_api_urls(api) -> None:

    """
    This method initialize the data acquisition cleaning API URLs.
    Parameters
    ----------
        api

    Returns
    -------
        None
    """
    api.add_resource(UploadFileView, UPLOAD_FILE_ENDPOINT)
    api.add_resource(DownloadCleanedDataView, DOWNLOAD_FILE_ENDPOINT)
    api.add_resource(ProcessedDataView, PROCESSED_DATA_ENDPOINT)
    api.add_resource(DataSetListView, DATA_SETS_LIST_ENDPOINT)
