import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DATASETS } from "../../components/cleaned-data/constants";

const DropDown = (props) => {
  const [dataSet, setDataSet] = React.useState("");

  const dataSets = DATASETS;

  const handleChange = (event) => {
    const value = event.target.value;
    const label = dataSets.filter((a) => a.key === value)[0]?.label;
    setDataSet(label);
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
        {DATASETS.length > 0 &&
          DATASETS?.map((option) => (
            <MenuItem value={option.key}>{option.label}</MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
