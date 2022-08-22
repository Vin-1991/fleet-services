import { httpMethods } from "../utils/httpMethods";
import { config } from "../utils/config";
import urlConstants from "../constants/urlconstants";

const {
  POPULAR_STATIONS_CHART_DATA,
  STATIONS_TURNOVER_CHART_DATA,
  RENTAL_DISTRIBUTION_DURATION_CHART_DATA,
} = urlConstants;

export const getPopularStationsChartData = async () => {
  return httpMethods.get(
    `${config.properties.FLEET_SERVICES_BASE_URL}${POPULAR_STATIONS_CHART_DATA}`
  );
};

export const getStationsTurnOverChartData = async () => {
  return httpMethods.get(
    `${config.properties.FLEET_SERVICES_BASE_URL}${STATIONS_TURNOVER_CHART_DATA}`
  );
};

export const getDistributionBikeRentalDurationChartData = async () => {
  return httpMethods.get(
    `${config.properties.FLEET_SERVICES_BASE_URL}${RENTAL_DISTRIBUTION_DURATION_CHART_DATA}`
  );
};
