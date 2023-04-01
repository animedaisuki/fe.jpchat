import React, { createContext, useEffect, useState } from "react";
import { autoFetchUserInfo } from "../api/autoFetchUserInfo/autoFetchUserInfo";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});
const UserDispatchContext = createContext(() => {});

const UserInfoProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        const result = await autoFetchUserInfo(token);
        if (result.error) {
          localStorage.clear();
          navigate("/login");
        } else {
          setUserInfo({ ...result.data, token });
        }
      }
    };
    try {
      fetchUserInfo();
    } catch (e) {
      localStorage.clear();
      navigate("/login");
    }
  }, []);
  return (
    <UserContext.Provider value={userInfo}>
      <UserDispatchContext.Provider value={setUserInfo}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

export { UserContext, UserDispatchContext, UserInfoProvider };
