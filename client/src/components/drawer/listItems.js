import * as React from "react";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import ViewListTwoToneIcon from "@mui/icons-material/ViewListTwoTone";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import DataThresholdingTwoToneIcon from "@mui/icons-material/DataThresholdingTwoTone";

export const mainListItems = [
  {
    text: "Upload data",
    icon: <UploadFileTwoToneIcon />,
    path: "/",
    id: 1,
  },
  {
    text: "Cleaned data",
    icon: <ViewListTwoToneIcon />,
    path: "processed-data",
    id: 2,
  },
  {
    text: "Dashboard",
    icon: <DashboardTwoToneIcon />,
    path: "dashboard",
    id: 3,
  },
  {
    text: "Data Analysis",
    icon: <DataThresholdingTwoToneIcon />,
    path: "analysis",
    id: 4,
  },
  {
    text: "Stations Map",
    icon: <MapTwoToneIcon />,
    path: "stations",
    id: 5,
  },
];
