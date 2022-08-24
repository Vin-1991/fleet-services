import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";

import {
  BICYCLE_HIRES_HEAD_CELLS,
  BICYCLE_STATIONS_HEAD_CELLS,
} from "./constants";
import Select from "../shared/DropDown";
import DownloadData from "../../components/download/Download";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function DataTableHead(props) {
  let columns = [];
  const { order, orderBy, onRequestSort, datasetName } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  let setName = datasetName;
  if (!setName) setName = 1;
  if (setName === 1) {
    columns = BICYCLE_HIRES_HEAD_CELLS;
  } else {
    columns = BICYCLE_STATIONS_HEAD_CELLS;
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const DataTableToolbar = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        backgroundColor: "#0000000d",
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Processed data
      </Typography>
    </Toolbar>
  );
};

const DataTable = (props) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [datasetName, setDatasetName] = useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onDataSetSelected = (value) => {
    props.passedDatasetName(value);
    props?.getProcessedData(value);
    setDatasetName(value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, height: 700 }}>
        <Container maxWidth="xl">
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "flex-end", my: 1 }}
          >
            <Grid item>
              <Select
                dataSetList={props?.dataSetList}
                onValueSelected={(value) => {
                  onDataSetSelected(value);
                }}
              />
            </Grid>
            <Grid item>
              <DownloadData datasetName={datasetName} />
            </Grid>
          </Grid>
          <Divider variant="middle" />
        </Container>

        {!!props?.processedData.length ? (
          <>
            <DataTableToolbar></DataTableToolbar>
            <TableContainer sx={{ height: 520, overflowX: "auto" }}>
              <Table
                sx={{ minWidth: 850 }}
                aria-labelledby="tableTitle"
                stickyHeader
              >
                <DataTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={props?.processedData.length}
                  datasetName={datasetName}
                />
                <TableBody>
                  {stableSort(
                    props?.processedData,
                    getComparator(order, orderBy)
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow hover key={index}>
                        <TableCell padding="checkbox"></TableCell>
                        {Object.keys(props?.processedData[0]).map((label) => (
                          <TableCell>{row[label]}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={props?.processedData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Box sx={{ my: 15, mx: 1 }}>
            <Typography color="text.secondary" variant="h6" component="div">
              No data to display. Please select one of the dataset.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default DataTable;
