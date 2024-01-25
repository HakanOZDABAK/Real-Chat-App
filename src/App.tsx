import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./layouts/Navbar";
import Dashboard from "./layouts/Dashboard";

function App() {
  return (
    <div>
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
