import { useEffect } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Datatable from "./Datatable";
import {
  fetchFleetServicesProcessedDataAction,
  fetchDataSetListAction,
} from "../../store/actions/index";

const CleanedData = (props) => {
  const loadProcessedData = () => {
    props?.getProcessedData("");
    props?.getDatSetList();
  };

  useEffect(() => {
    loadProcessedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Datatable
              processedData={props?.processedData?.data}
              dataSetList={props?.dataSetList?.data}
              getProcessedData={props?.getProcessedData}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    processedData: state.processedData,
    dataSetList: state.dataSetList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProcessedData: (queryDatasetname) => {
      dispatch(fetchFleetServicesProcessedDataAction(queryDatasetname));
    },
    getDatSetList: () => {
      dispatch(fetchDataSetListAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CleanedData);
