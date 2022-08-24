import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import CategoryLineChart from "./CategoryLineChart";
import SkeletonLoader from "../loader/skeleton";
import {
  showSnackbar,
  fetchStationsDistanceChartDataAction,
} from "../../store/actions/index";
import { CHART_DATA_CONSTANTS } from "../../constants/constants";

const DataAnalysis = (props) => {
  const dispatchStore = useDispatch();
  const { t } = useTranslation();

  const loadChartData = () => {
    props?.getStationsDistanceChartData();
  };

  useEffect(() => {
    loadChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props?.stationsDistanceChartData?.rejected) {
      dispatchStore(
        showSnackbar({
          message: t(CHART_DATA_CONSTANTS.chartDataLoadFailedMessage),
          severity: t("error"),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.stationsDistanceChartData?.rejected]);

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
        <Divider sx={{ mb: 2 }}>
          <Chip label="Data Analysis" />
        </Divider>
        <Grid container spacing={2}>
          {/* Line Chart */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 650,
              }}
            >
              {!!props?.stationsDistanceChartData.data.length ? (
                <CategoryLineChart
                  stationsDistanceChartData={
                    props?.stationsDistanceChartData?.data
                  }
                />
              ) : (
                <SkeletonLoader height={600} />
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
    stationsDistanceChartData: state.stationsDistanceChartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStationsDistanceChartData: () => {
      dispatch(fetchStationsDistanceChartDataAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataAnalysis);
