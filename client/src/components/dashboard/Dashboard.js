import { useEffect } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ClusteredChart from "./ClusteredChart";
import DualAxisChart from "./DualAxisChart";
import LineChart from "./LineChart";
import {
  fetchPopularStationsChartDataAction,
  fetchStationsTurnOverChartDataAction,
  fetchDistributionBikeRentalDurationChartDataAction,
} from "../../store/actions/index";
import Loader from "../loader/loader";
import { CHART_DATA_CONSTANTS } from "../../constants/constants";

const Dashboard = (props) => {
  const loadChartsData = () => {
    props?.getPopularStationsChartData();
    props?.getStationsTurnOverChartData();
    props?.getDistributionBikeRentalDurationChartData();
  };

  useEffect(() => {
    loadChartsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      {props?.popularStationsChartData?.pending && (
        <Loader loading message={CHART_DATA_CONSTANTS.chartDataLoaderMessage} />
      )}
      <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
        <Grid container spacing={2}>
          {/* Chart */}
          <Grid item xs={12} md={5} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 500,
              }}
            >
              {!!props?.popularStationsChartData?.data.length && (
                <ClusteredChart
                  popularStationsChartData={
                    props?.popularStationsChartData?.data
                  }
                />
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={5} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 500,
              }}
            >
              {!!props?.stationsTurnOverChartData.data.length && (
                <DualAxisChart
                  stationsTurnOverChartData={
                    props?.stationsTurnOverChartData?.data
                  }
                />
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
              {!!props?.stationsTurnOverChartData.data.length && (
                <LineChart
                  distributionBikeRentalDurationChartData={
                    props?.distributionBikeRentalDurationChartData?.data
                  }
                />
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
