import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DrawerPanel from "./drawer/Drawer";
import Dashboard from "./dashboard/Dashboard";
import Upload from "./upload/Upload";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DrawerPanel />
        <Routes>
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route path="/analysis" element={<Upload />}></Route>
          <Route path="/upload" element={<Upload />}></Route>
          <Route path="/cleaned-data" element={<Upload />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
