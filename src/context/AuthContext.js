import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../config';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const login = (email, password) => {
    setIsLoading(true);
    axios.post(`${BASE_URL}/api/v1/auth/login`, {
      email,
      password
    })
    .then(res => {
      let userInfo = res.data;
      setUserInfo(userInfo);
      setUserToken(userInfo.accessToken);
      setRefreshToken(userInfo.refreshToken);

      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      AsyncStorage.setItem('userToken', userInfo.accessToken);
      AsyncStorage.setItem('refreshToken', userInfo.refreshToken);
      console.log(userInfo.refreshToken)
      console.log(userInfo.accessToken)
    })
    .catch(e => {
      console.log(`giriş hatası ${e}`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  const refreshAccessToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh-token`, {
        refreshToken
      });
  
      const newAccessToken = response.data.accessToken;
      setUserToken(newAccessToken);
      AsyncStorage.setItem('userToken', newAccessToken);
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshAccessToken();
        return axios(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  const logout =  () => {
    setIsLoading(true);
    setUserToken(null);
    setRefreshToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('refreshToken');
    setIsLoading(false);
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfoString = await AsyncStorage.getItem('userInfo');
      let userTokenString = await AsyncStorage.getItem('userToken');

      if (userInfoString && userTokenString) {
        let userInfo = JSON.parse(userInfoString);
        setUserInfo(userInfo);
        setUserToken(userTokenString);
      }

      setIsLoading(false);
    } catch (e) {
      console.log('is logged error', e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}
