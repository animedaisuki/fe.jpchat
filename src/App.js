import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Homepage from "./Pages/HomePage/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
