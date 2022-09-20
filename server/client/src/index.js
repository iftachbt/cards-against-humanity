import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Master from "./components/index/master";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Master />
  </Router>
);
