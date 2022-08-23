import React from "react";
import "./App.css";

import DrawerPanel from "./components/drawer/Drawer";
import Snackbars from "./components/loader/snackBar";

function App() {
  return (
    <div className="App">
      <DrawerPanel />
      <Snackbars />
    </div>
  );
}

export default App;
