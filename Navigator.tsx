import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screens/Login';
import Dashboard from './Dashboard';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
