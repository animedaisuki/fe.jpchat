import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Homepage from "./Pages/HomePage/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
