import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DropDown = (props) => {
  const [dataSet, setDataSet] = React.useState("bicycle_hires");

  const handleChange = (event) => {
    const value = event.target.value;
    setDataSet(value);
    props.onValueSelected(value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }} size="small">
      <InputLabel id="demo-simple-select-label">Dataset</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={dataSet}
        label="Dataset"
        onChange={handleChange}
      >
        <MenuItem value={"bicycle_hires"}>Bicycle Hire</MenuItem>
        <MenuItem value={"bicycle_stations"}>Bicycle Stations</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DropDown;
