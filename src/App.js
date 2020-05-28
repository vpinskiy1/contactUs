import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Routes from "./routes/Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename={window.location.pathname || ""}>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
