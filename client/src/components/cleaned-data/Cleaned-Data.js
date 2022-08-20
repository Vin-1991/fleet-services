import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Datatable from "./Datatable";

const CleanedData = () => {
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
            <Datatable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CleanedData;
