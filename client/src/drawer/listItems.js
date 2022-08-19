import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
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
    icon: <PeopleIcon />,
    path: "upload",
    id: 3,
  },
  {
    text: "Cleaned data",
    icon: <PeopleIcon />,
    path: "cleaned-data",
    id: 4,
  },
];
