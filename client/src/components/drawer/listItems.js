import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DataArraySharp from "@mui/icons-material/DataArraySharp";
import BarChartIcon from "@mui/icons-material/BarChart";

export const mainListItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
    id: 1,
  },
  {
    text: "Analysis Reports",
    icon: <BarChartIcon />,
    path: "analysis",
    id: 2,
  },
  {
    text: "Upload data",
    icon: <UploadFileIcon />,
    path: "upload",
    id: 3,
  },
  {
    text: "Cleaned data",
    icon: <DataArraySharp />,
    path: "cleaned-data",
    id: 4,
  },
];
