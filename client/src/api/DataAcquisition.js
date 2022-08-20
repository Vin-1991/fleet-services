import { httpMethods } from "../utils/httpMethods";
import { config } from "../utils/config";
import urlConstants from "../constants/urlconstants";

const formData = require("form-data");

const {
  UPLOAD_FLEET_SERVICES_FILE,
  DOWNLOAD_FLEET_SERVICES_FILE,
  FLEET_SERVICES_PROCESSED_DATA,
  DATA_SETS_LIST,
} = urlConstants;

export const fleetServicesUploadFile = async (file, dataset) => {
  const HEADER = {
    "Content-Type": "multipart/form-data",
  };
  let data = new formData();
  data.append("input_file", file);
  data.append("dataset", dataset);
  return httpMethods.post(
    `${config.properties.FLEET_SERVICES_BASE_URL}${UPLOAD_FLEET_SERVICES_FILE}`,
    data,
    HEADER
  );
};

export const fleetServicesDownloadFile = async (queryDatasetName) => {
  return httpMethods.get(
    `${config.properties.FLEET_SERVICES_BASE_URL}${DOWNLOAD_FLEET_SERVICES_FILE}?dataset=${queryDatasetName}`
  );
};

export const getFleetServicesProcessedData = async (queryDatasetName) => {
  return httpMethods.get(
    `${config.properties.FLEET_SERVICES_BASE_URL}${FLEET_SERVICES_PROCESSED_DATA}?dataset=${queryDatasetName}`
  );
};

export const getDataSetList = async () => {
  return httpMethods.get(
    `${config.properties.FLEET_SERVICES_BASE_URL}${DATA_SETS_LIST}`
  );
};
