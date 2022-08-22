import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, Box, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { connect, useDispatch } from "react-redux";

import Loader from "../loader/loader";
import { UPLOAD_FLEET_SERVICES_FILE_CONSTANTS } from "../../constants/constants";
import {
  showSnackbar,
  fleetServicesUploadFileAction,
  fleetServicesUploadFileActionReset,
} from "../../store/actions/index";

import Select from "../shared/DropDown";

const Upload = (props) => {
  const dispatchStore = useDispatch();
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [datasetName, setDatasetName] = useState("");

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
          message: UPLOAD_FLEET_SERVICES_FILE_CONSTANTS.uploadSuccessMessage,
          severity: "success",
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
          message: UPLOAD_FLEET_SERVICES_FILE_CONSTANTS.uploadFailedMessage,
          severity: "error",
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
              <Typography sx={{ marginBottom: "2%" }}>
                Upload file to begin
              </Typography>
              <Grid item xs={12} md={12} lg={12}>
                <Select
                  onValueSelected={(value) => {
                    onDataSetSelected(value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Button
                  component="label"
                  variant="outlined"
                  disabled={!datasetName}
                  startIcon={<UploadFileIcon />}
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
              <Grid>
                <Box>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                    disabled={!selectedFile}
                    onClick={uploadCSVFileData}
                  >
                    Upload file
                  </Button>
                </Box>
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
