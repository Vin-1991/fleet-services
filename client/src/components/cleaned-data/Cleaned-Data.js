import { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Datatable from "./Datatable";
import {
  showSnackbar,
  fetchFleetServicesProcessedDataAction,
  fetchDataSetListAction,
} from "../../store/actions/index";
import Loader from "../loader/loader";
import { PROCESSED_DATA_CONSTANTS } from "../../constants/constants";

const CleanedData = (props) => {
  const dispatchStore = useDispatch();
  const { t } = useTranslation();
  const [datasetName, setDatasetName] = useState("");

  const loadProcessedData = () => {
    if (datasetName) {
      props?.getProcessedData(datasetName);
    }
    props?.getDatSetList();
  };

  useEffect(() => {
    loadProcessedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props?.processedData?.rejected) {
      dispatchStore(
        showSnackbar({
          message: t(PROCESSED_DATA_CONSTANTS.dataLoadFailedMessage),
          severity: t("error"),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.processedData?.rejected]);

  return (
    <Box
      sx={{
        my: 1.5,
        mx: 1,
      }}
    >
      {props?.processedData?.pending && (
        <Loader loading message={PROCESSED_DATA_CONSTANTS.dataLoaderMessage} />
      )}
      <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Datatable
              processedData={props?.processedData?.data}
              dataSetList={props?.dataSetList?.data}
              getProcessedData={props?.getProcessedData}
              passedDatasetName={setDatasetName}
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
