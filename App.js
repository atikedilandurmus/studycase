import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNav from './src/context/AppNav';
import { AuthProvider } from './src/context/AuthContext';


export default function App() {
  
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
