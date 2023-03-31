import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserInfoProvider } from "./context/UserInfoProvider";
import LoginPage from "./pages/LoginPage/LoginPage";
import Homepage from "./pages/HomePage/Homepage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ChatPage from "./pages/ChatPage/ChatPage";

function App() {
  return (
    <UserInfoProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<ChatPage />}>
          <Route path="/chat/:chatId" element="" />
          <Route path="/chat/friends" element="" />
          <Route path="/chat/settings" element="" />
        </Route>
      </Routes>
    </UserInfoProvider>
  );
}

export default App;
