import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EatTodayStep1 from './src/EatTodayStep1';
import Breakfast from './src/Breakfast';
import Activities from './src/Activities';
import WalkingScreen from './src/Walking';
import home from './src/home';
import DailyStep from './src/DailyStep';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="EatTodayStep1"
        screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="EatTodayStep1" component={EatTodayStep1} />
          <Stack.Screen name="Breakfast" component={Breakfast} />
          <Stack.Screen name="Activities" component={Activities} />
          <Stack.Screen name="Walking" component={WalkingScreen} />
          <Stack.Screen name="home" component={home} />
          <Stack.Screen name="DailyStep" component={DailyStep} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}