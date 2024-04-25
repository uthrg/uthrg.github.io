import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom"
import "./index.css";
import Home from "./Home/index.js";
import Summary from "./Home/summary.js";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
