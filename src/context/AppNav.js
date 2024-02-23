// AppNav.js
import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from '../navigation/AuthStack';
import { AuthContext } from './AuthContext';
import Home from '../screens/HomeScreen';
import Layout from '../screens/layout';

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
        {userToken !== null ? <Layout/> : <AuthStack/>}
    </NavigationContainer>
  );
};

export default AppNav;
