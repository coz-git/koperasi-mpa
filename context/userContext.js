import React, { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie'

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    Cookies.get('userData') && setUserData(JSON.parse(Cookies.get('userData'))) 
    Cookies.get('isLogin') && setIsLogin(JSON.parse(Cookies.get('isLogin'))) 
    // setUserData(JSON.parse(Cookies.get('userData')) || null)
    // setUserData(JSON.parse(localStorage.getItem('userData')))
    // setIsLogin(JSON.parse(localStorage.getItem('isLogin')) || false)
  }, [])

  const saveLogin = useCallback((data) => {
    setIsLogin(true);
    setUserData({
      Role: data.Role,
      Email: data.Email,
      UserId: data.UserId,
      Token: data.accessToken,
    });
    // localStorage.setItem('isLogin', JSON.stringify(true));
    // localStorage.setItem('userData', JSON.stringify(data));
    Cookies.set('userData', JSON.stringify(data))
    Cookies.set('isLogin', JSON.stringify(true))
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
