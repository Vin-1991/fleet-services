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

FILE_PATH_EXPORT_FILE = (
    "/Users/aggarwalvinay/PycharmProjects/fleet-services/server/data-files/"
)

# Queries
DOWNLOAD_CLEANED_FILE_QUERY = """ SELECT * from {table_name} """
