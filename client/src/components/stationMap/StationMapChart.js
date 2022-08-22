import { useEffect } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MapChart from "../dashboard/MapChart";
import { fetchStationsMapChartDataAction } from "../../store/actions/index";
import Loader from "../loader/loader";
import { CHART_DATA_CONSTANTS } from "../../constants/constants";

const StationsMap = (props) => {
  const loadChartsData = () => {
    props?.getStationsMapChartData();
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
      {props?.stationsMapOverChartData?.pending && (
        <Loader
          loading
          message={CHART_DATA_CONSTANTS.mapChartDataLoaderMessage}
        />
      )}
      <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
        <Grid container spacing={2}>
          {/* Chart */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 750,
              }}
            >
              <Typography sx={{ fontSize: "1.5rem" }}>
                Stations on Map
              </Typography>
              {!!props?.stationsMapOverChartData?.data.length && (
                <MapChart
                  stationsMapOverChartData={
                    props?.stationsMapOverChartData?.data
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
    stationsMapOverChartData: state.stationsMapOverChartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStationsMapChartData: () => {
      dispatch(fetchStationsMapChartDataAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StationsMap);
