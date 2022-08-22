# Error descriptions
INPUT_FILE_REQUIRED = "Input file is required."
INPUT_FILE_ERROR = "Something went wrong while uploading the file."
DOWNLOAD_FILE_ERROR = "Something went wrong while downloading the file."
PROCESSED_DATA_ERROR = "Something went wrong while fetching the data."
TABLE_NAME_REQUIRED = "Table name is required."

# Endpoints
UPLOAD_FILE_ENDPOINT = "/upload-file/"
DOWNLOAD_FILE_ENDPOINT = "/download-file/"
PROCESSED_DATA_ENDPOINT = "/processed-data/"
DATA_SETS_LIST_ENDPOINT = "/dataset-list/"

FILE_PATH_EXPORT_FILE = (
    "/Users/aggarwalvinay/PycharmProjects/fleet-services/server/data-files/"
)

DATASETS = {
    1: "Bicycle Hire",
    2: "Bicycle Stations",
}

BICYCLE_HIRES_MANDATORY_COLUMNS = [
    "rental_id",
    "bike_id",
    "end_station_id",
    "start_station_id",
]
BICYCLE_STATIONS_MANDATORY_COLUMNS = ["id"]

DATASET_COLUMNS_BICYCLE_HIRES_TYPE_MAPPING = {
    "rental_id": "int",
    "duration": "int",
    "bike_id": "int",
    "end_date": "timestamp",
    "end_station_id": "int",
    "end_station_name": "str",
    "start_date": "timestamp",
    "start_station_id": "int",
    "start_station_name": "str",
}


DATASET_COLUMNS_BICYCLE_STATIONS_TYPE_MAPPING = {
    "id": "int",
    "install_date": "date",
    "installed": "bool",
    "latitude": "float",
    "locked": "bool",
    "longitude": "float",
    "name": "str",
    "bikes_count": "int",
    "docks_count": "int",
    "nbEmptyDocks": "int",
    "removal_date": "date",
    "temporary": "bool",
    "terminal_name": "int",
}


# Queries
DOWNLOAD_CLEANED_FILE_QUERY = """ SELECT * from {table_name} """
