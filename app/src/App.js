import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />

      <div className="p-5">
        <Routes />
      </div>
    </Router>
  );
};

export default App;
