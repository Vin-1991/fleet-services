import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button, Box } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import FileDownload from "@mui/icons-material/FileDownload";
import Loader from "../loader/loader";
import { DOWNLOAD_FLEET_SERVICES_FILE_CONSTANTS } from "../../constants/constants";
import {
  showSnackbar,
  fleetServicesDownloadFileAction,
  fleetServicesDownloadFileActionReset,
} from "../../store/actions/index";

const Download = (props) => {
  const dispatchStore = useDispatch();

  useEffect(() => {
    if (props?.downloadFileData?.successful) {
      const url = window.URL.createObjectURL(
        new Blob([props?.downloadFileData?.data])
      );
      const link = document.createElement("a");
      link.href = url;
      // const newDate = new Date()
      //   .toISOString()
      //   .replace("T", "_")
      //   .substring(0, 19)
      //   .replace(":", "-")
      //   .replaceAt(16, "-");
      link.setAttribute("download", `cleaned.csv`);
      document.body.appendChild(link);
      link.click();
      dispatchStore(
        showSnackbar({
          message:
            DOWNLOAD_FLEET_SERVICES_FILE_CONSTANTS.downloadSuccessMessage,
          severity: "success",
        })
      );
      props?.downloadFileReset();
    }
    if (props?.downloadFileData?.rejected) {
      dispatchStore(
        showSnackbar({
          message: DOWNLOAD_FLEET_SERVICES_FILE_CONSTANTS.downloadFailedMessage,
          severity: "error",
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
        <Button
          component="label"
          variant="outlined"
          startIcon={<FileDownload />}
          onClick={() => props?.downloadFile(props?.datasetName)}
        >
          Download file
        </Button>
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
