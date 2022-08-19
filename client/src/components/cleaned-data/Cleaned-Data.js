import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Orders from "../dashboard/Orders";

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
          {/* Recent Orders */}
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CleanedData;
