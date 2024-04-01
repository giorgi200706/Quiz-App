/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {MainScreen, QuestionsScreen} from './src/screens';

const Stack = createStackNavigator();

const App = () => {
  // screenOptions={{headerShown: false}}
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Questions" component={QuestionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
