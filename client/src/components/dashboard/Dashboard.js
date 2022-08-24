import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import ClusteredChart from "./ClusteredChart";
import DualAxisChart from "./DualAxisChart";
import LineChart from "./LineChart";
import SkeletonLoader from "../loader/skeleton";
import { CHART_DATA_CONSTANTS } from "../../constants/constants";
import {
  showSnackbar,
  fetchPopularStationsChartDataAction,
  fetchStationsTurnOverChartDataAction,
  fetchDistributionBikeRentalDurationChartDataAction,
} from "../../store/actions/index";

const Dashboard = (props) => {
  const dispatchStore = useDispatch();
  const { t } = useTranslation();
  const loadChartsData = () => {
    props?.getPopularStationsChartData();
    props?.getStationsTurnOverChartData();
    props?.getDistributionBikeRentalDurationChartData();
  };

  useEffect(() => {
    loadChartsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      props?.popularStationsChartData?.rejected ||
      props?.stationsTurnOverChartData?.rejected ||
      props?.distributionBikeRentalDurationChartData?.rejected
    ) {
      dispatchStore(
        showSnackbar({
          message: t(CHART_DATA_CONSTANTS.chartDataLoadFailedMessage),
          severity: t("error"),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props?.popularStationsChartData?.rejected,
    props?.stationsTurnOverChartData?.rejected,
    props?.distributionBikeRentalDurationChartData?.rejected,
  ]);

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
        <Divider sx={{ mb: 2 }}>
          <Chip label="Analysis Dashboard" />
        </Divider>

        <Grid container spacing={2}>
          {/* Charts */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 500,
              }}
            >
              {!!props?.popularStationsChartData?.data.length ? (
                <ClusteredChart
                  popularStationsChartData={
                    props?.popularStationsChartData?.data
                  }
                />
              ) : (
                <SkeletonLoader height={450} />
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 500,
              }}
            >
              {!!props?.stationsTurnOverChartData.data.length ? (
                <DualAxisChart
                  stationsTurnOverChartData={
                    props?.stationsTurnOverChartData?.data
                  }
                />
              ) : (
                <SkeletonLoader height={450} />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 450,
              }}
            >
              {!!props?.stationsTurnOverChartData.data.length ? (
                <LineChart
                  distributionBikeRentalDurationChartData={
                    props?.distributionBikeRentalDurationChartData?.data
                  }
                />
              ) : (
                <SkeletonLoader height={450} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    popularStationsChartData: state.popularStationsChartData,
    stationsTurnOverChartData: state.stationsTurnOverChartData,
    distributionBikeRentalDurationChartData:
      state.distributionBikeRentalDurationChartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPopularStationsChartData: () => {
      dispatch(fetchPopularStationsChartDataAction());
    },
    getStationsTurnOverChartData: () => {
      dispatch(fetchStationsTurnOverChartDataAction());
    },
    getDistributionBikeRentalDurationChartData: () => {
      dispatch(fetchDistributionBikeRentalDurationChartDataAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
