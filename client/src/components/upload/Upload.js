import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import { Button, Box, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import Loader from "../loader/loader";
import Select from "../shared/DropDown";
import { UPLOAD_FLEET_SERVICES_FILE_CONSTANTS } from "../../constants/constants";
import {
  showSnackbar,
  fleetServicesUploadFileAction,
  fleetServicesUploadFileActionReset,
} from "../../store/actions/index";

const Upload = (props) => {
  const dispatchStore = useDispatch();
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [datasetName, setDatasetName] = useState("");
  const { t } = useTranslation();

  const handleFileUpload = (event) => {
    const fileDetails = event.target.files[0];
    setFileName(fileDetails?.name);
    setSelectedFile(fileDetails);
  };

  const uploadCSVFileData = () => {
    props?.uploadFile(selectedFile, datasetName);
  };

  useEffect(() => {
    if (props?.uploadedFileData?.successful) {
      props?.uploadFileReset();
      setSelectedFile(null);
      setFileName("");
      setDatasetName("");
      dispatchStore(
        showSnackbar({
          message: t(UPLOAD_FLEET_SERVICES_FILE_CONSTANTS.uploadSuccessMessage),
          severity: t("success"),
        })
      );
    }
    if (props?.uploadedFileData?.rejected) {
      props?.uploadFileReset();
      setSelectedFile(null);
      setFileName("");
      setDatasetName("");
      dispatchStore(
        showSnackbar({
          message: t(UPLOAD_FLEET_SERVICES_FILE_CONSTANTS.uploadFailedMessage),
          severity: t("error"),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.uploadedFileData]);

  const onDataSetSelected = (value) => {
    setDatasetName(value);
  };

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      {props?.uploadedFileData?.pending && (
        <Loader
          loading
          message={UPLOAD_FLEET_SERVICES_FILE_CONSTANTS.uploadLoaderMessage}
        />
      )}
      <Container maxWidth="sm" sx={{ mt: 25, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 250,
              }}
            >
              <Typography>
                <Divider sx={{ mb: 3 }}>
                  <Chip label="Upload a file to begin" />
                </Divider>
              </Typography>
              <Grid item sx={{ mb: 3 }}>
                <Select
                  onValueSelected={(value) => {
                    onDataSetSelected(value);
                  }}
                />
              </Grid>
              <Grid container sx={{ my: 1 }}>
                <Grid item xs>
                  <Button
                    component="label"
                    variant="outlined"
                    disabled={!datasetName}
                    startIcon={<TaskOutlinedIcon />}
                  >
                    Select file (.csv)
                    <input
                      type={"file"}
                      id="import-button"
                      accept=".csv"
                      hidden
                      onChange={handleFileUpload}
                    />
                  </Button>
                  <Box>{fileName}</Box>
                </Grid>
                <Divider orientation="vertical" flexItem></Divider>
                <Grid item xs>
                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    disabled={!selectedFile}
                    onClick={uploadCSVFileData}
                  >
                    <UploadFileIcon sx={{ mr: 1 }} />
                    Upload file
                  </Fab>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    uploadedFileData: state.uploadedFileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadFile: (file, dataset) => {
      dispatch(fleetServicesUploadFileAction(file, dataset));
    },
    uploadFileReset: () => {
      dispatch(fleetServicesUploadFileActionReset());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
