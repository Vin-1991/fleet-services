import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DATASETS } from "../cleaned-data/constants";

const DropDown = (props) => {
  const [dataSet, setDataSet] = React.useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setDataSet(value);
    props.onValueSelected(value);
  };

  return (
    <FormControl sx={{ width: 250 }} size="small">
      <InputLabel id="demo-simple-select-label">Dataset</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={dataSet}
        label="Dataset"
        onChange={handleChange}
      >
        {DATASETS.map((row, index) => (
          <MenuItem key={index} value={row.key}>
            {row.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
