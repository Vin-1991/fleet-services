import { httpMethods } from "../utils/httpMethods";
import { config } from "../utils/config";
import urlConstants from "../constants/urlconstants";

const formData = require("form-data");

const {
  UPLOAD_FLEET_SERVICES_FILE,
  DOWNLOAD_FLEET_SERVICES_FILE,
  FLEET_SERVICES_PROCESSED_DATA,
} = urlConstants;

export const fleetServicesUploadFile = async (file, table_name) => {
  const HEADER = {
    "Content-Type": "multipart/form-data",
  };
  let data = new formData();
  data.append("input_file", file);
  data.append("table_name", table_name);
  return httpMethods.post(
    `${config.properties.FLEET_SERVICES_BASE_URL}${UPLOAD_FLEET_SERVICES_FILE}`,
    data,
    HEADER
  );
};

export const fleetServicesDownloadFile = async (queryTableName) => {
  return httpMethods.get(
    `${config.properties.FLEET_SERVICES_BASE_URL}${DOWNLOAD_FLEET_SERVICES_FILE}?table_name=${queryTableName}`
  );
};

export const getFleetServicesProcessedData = async (queryDatasetname) => {
  return httpMethods.get(
    `${config.properties.FLEET_SERVICES_BASE_URL}${FLEET_SERVICES_PROCESSED_DATA}?dataset=${queryDatasetname}`
  );
};
