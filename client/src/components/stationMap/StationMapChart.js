import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import SkeletonLoader from "../loader/skeleton";
import MapChart from "../dashboard/MapChart";
import {
  showSnackbar,
  fetchStationsMapChartDataAction,
} from "../../store/actions/index";
import { CHART_DATA_CONSTANTS } from "../../constants/constants";

const StationsMap = (props) => {
  const dispatchStore = useDispatch();
  const { t } = useTranslation();

  const loadChartsData = () => {
    props?.getStationsMapChartData();
  };

  useEffect(() => {
    loadChartsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props?.stationsMapOverChartData?.rejected) {
      dispatchStore(
        showSnackbar({
          message: t(CHART_DATA_CONSTANTS.chartDataLoadFailedMessage),
          severity: t("error"),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.stationsMapOverChartData?.rejected]);

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
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
              <Box sx={{ my: 1.5 }}>
                <Divider>
                  <Chip label="Station locations" />
                </Divider>
              </Box>
              {!!props?.stationsMapOverChartData?.data.length ? (
                <MapChart
                  stationsMapOverChartData={
                    props?.stationsMapOverChartData?.data
                  }
                />
              ) : (
                <SkeletonLoader height={750} />
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
