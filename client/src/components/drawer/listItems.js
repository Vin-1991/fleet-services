import * as React from "react";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import ViewListTwoToneIcon from "@mui/icons-material/ViewListTwoTone";
import BarChartIcon from "@mui/icons-material/BarChart";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";

export const mainListItems = [
  {
    text: "Upload data",
    icon: <UploadFileTwoToneIcon />,
    path: "upload",
    id: 1,
  },
  {
    text: "Cleaned data",
    icon: <ViewListTwoToneIcon />,
    path: "cleaned-data",
    id: 2,
  },
  {
    text: "Dashboard",
    icon: <DashboardTwoToneIcon />,
    path: "/",
    id: 3,
  },
  {
    text: "Analysis Reports",
    icon: <MapTwoToneIcon />,
    path: "analysis",
    id: 4,
  },
];
