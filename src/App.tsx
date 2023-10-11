import React, {createContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Header, Navbar} from "./components";
import LandingPage from "./pages";
import MyGeotabIntroduction from "./pages/myGeotab/introduction";
import MyGeotabWhatsNew from "./pages/myGeotab/whatsNew";
import MyGeotabGettingStarted from "./pages/myGeotab/guides/gettingStarted";
import MyGeotabMethods from "./pages/myGeotab/apiReference/methods";
import MyGeotabObjects from "./pages/myGeotab/apiReference/objects";

import MyAdminIntroduction from "./pages/myAdmin/introduction";
import HardwareIntroduction from "./pages/hardware/introduction";
import DriveIntroduction from "./pages/drive/introduction";

function App() {
  return (
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/sdk" Component={LandingPage} />
          <Route path="/myGeotabIntroduction" Component={MyGeotabIntroduction} />
          <Route path="/whatsNew" Component={MyGeotabWhatsNew} />
          <Route path="/gettingStarted" Component={MyGeotabGettingStarted} />
          <Route path="/methods" Component={MyGeotabMethods} />
          <Route path="/objects" Component={MyGeotabObjects} />

          <Route path="/myAdminIntroduction" Component={MyAdminIntroduction} />
          <Route path="/hardwareIntroduction" Component={HardwareIntroduction} />
          <Route path="/driveIntroduction" Component={DriveIntroduction} />

        </Routes>
      </Router>
  );
}

export default App;
