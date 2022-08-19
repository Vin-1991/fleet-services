# Error descriptions
INPUT_FILE_REQUIRED = "Input file is required."
INPUT_FILE_ERROR = "Something went wrong while uploading the file."
DOWNLOAD_FILE_ERROR = "Something went wrong while dwnloading the file."
TABLE_NAME_REQUIRED = "Table name is required."

# Endpoints
UPLOAD_FILE_ENDPOINT = "/upload-file/"
DOWNLOAD_FILE_ENDPOINT = "/downoad-file/"

BICYCLE_HIRE_TABLE_COLUMNS = [
    "rental_id",
    "duration",
    "bike_id",
    "end_date",
    "end_station_id",
    "end_station_name",
    "start_date",
    "start_station_id",
    "start_station_name",
]


# Queries

FILE_PATH_EXPORT_FILE = "./server/data-files/"

# Queries
DOWNLOAD_CLEANED_FILE_QUERY = """ SELECT * from '{table_name}' """
