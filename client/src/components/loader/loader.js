import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = (props) => {
  const { loading, message } = props;
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
      <Box
        sx={{
          top: "70px",
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body1" component="div">
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default Loader;
