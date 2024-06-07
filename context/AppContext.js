// AppContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAllAsyncData } from '../assets/data/async_storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    getData();
  },[])

  const getData = async () => {
    try {
      let data = await getAllAsyncData();
      if(data.token){
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('error at AppContext.js->getData: ', error)
    }
  }

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
    return useContext(AppContext);
}
