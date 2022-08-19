import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DrawerPanel from "./components/drawer/Drawer";
import Dashboard from "./components/dashboard/Dashboard";
import DataAnalysis from "./components/data-analysis/DataAnalysis";
import Upload from "./components/upload/Upload";
import CleanedData from "./components/cleaned-data/Cleaned-Data";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DrawerPanel />
        <Routes>
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route path="/analysis" element={<DataAnalysis />}></Route>
          <Route path="/upload" element={<Upload />}></Route>
          <Route path="/cleaned-data" element={<CleanedData />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
