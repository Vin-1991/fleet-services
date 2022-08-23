import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import { connect, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import FileDownload from "@mui/icons-material/FileDownload";

import Loader from "../loader/loader";
import { newDate } from "../../utils/utils";
import { DOWNLOAD_FLEET_SERVICES_FILE_CONSTANTS } from "../../constants/constants";
import {
  showSnackbar,
  fleetServicesDownloadFileAction,
  fleetServicesDownloadFileActionReset,
} from "../../store/actions/index";

const Download = (props) => {
  const dispatchStore = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (props?.downloadFileData?.successful) {
      const url = window.URL.createObjectURL(
        new Blob([props?.downloadFileData?.data])
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `processed_${props?.datasetName}_${newDate}.csv`
      );
      document.body.appendChild(link);
      link.click();
      dispatchStore(
        showSnackbar({
          message: t(
            DOWNLOAD_FLEET_SERVICES_FILE_CONSTANTS.downloadSuccessMessage
          ),
          severity: t("success"),
        })
      );
      props?.downloadFileReset();
    }
    if (props?.downloadFileData?.rejected) {
      dispatchStore(
        showSnackbar({
          message: t(
            DOWNLOAD_FLEET_SERVICES_FILE_CONSTANTS.downloadFailedMessage
          ),
          severity: t("error"),
        })
      );
      props?.downloadFileReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.downloadFileData]);

  return (
    <Grid>
      {props?.downloadFileData?.pending && (
        <Loader
          loading
          message={DOWNLOAD_FLEET_SERVICES_FILE_CONSTANTS.downloadLoaderMessage}
        />
      )}
      <Box>
        <Fab
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          disabled={!props?.datasetName}
          onClick={() => props?.downloadFile(props?.datasetName)}
        >
          <FileDownload />
        </Fab>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    downloadFileData: state.downloadFileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    downloadFile: (dataset) => {
      dispatch(fleetServicesDownloadFileAction(dataset));
    },
    downloadFileReset: () => {
      dispatch(fleetServicesDownloadFileActionReset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Download);
