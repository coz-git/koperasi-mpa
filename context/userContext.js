import React, { useState, useEffect, useCallback } from 'react';

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  const saveLogin = useCallback((data) => {
    setIsLogin(true);
    setUserData({
      Role: data.Role,
      Email: data.Email,
      UserId: data.UserId,
      Token: data.accessToken,
    });
  });

  const value = {
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    saveLogin,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
