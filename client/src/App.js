import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import DrawerPanel from "./components/drawer/Drawer";
import Snackbars from "./components/loader/snackBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DrawerPanel />
        <Snackbars />
      </BrowserRouter>
    </div>
  );
}

export default App;
