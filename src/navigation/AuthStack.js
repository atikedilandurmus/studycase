import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardScreen from '../screens/OnboardScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Home from '../screens/HomeScreen';
import Layout from '../screens/layout';

const Stack = createStackNavigator();

export default function AuthStack() {

  return (     
        <Stack.Navigator>         
          <Stack.Screen name="Onboard" component={OnboardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Layout" component={Layout} options={{ headerShown: false }} />
        </Stack.Navigator>
  );
}