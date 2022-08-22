import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DrawerPanel from "./components/drawer/Drawer";
import Dashboard from "./components/dashboard/Dashboard";
import DataAnalysis from "./components/data-analysis/DataAnalysis";
import Upload from "./components/upload/Upload";
import CleanedData from "./components/cleaned-data/Cleaned-Data";
import Snackbars from "./components/loader/snackBar";
import StationsMap from "./components/stationMap/StationMapChart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DrawerPanel />
        <Snackbars />
        <Routes>
          <Route exact path="/" element={<Upload />}></Route>
          <Route path="/processed-data" element={<CleanedData />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/stations" element={<StationsMap />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
