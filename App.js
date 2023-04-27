// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import React, { useEffect, createRef } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ChooseScreen from './screens/ChooseScreen';
import SelectScreen from './screens/SelectScreen';
import UserSignupScreen from './screens/UserSignupScreen';
import NgoSignupScreen from './screens/NgoSignupScreen';
import UserLoginScreen from './screens/UserLoginScreen';
import NgoLoginScreen from './screens/NgoLoginScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import NgoHomeScreen from './screens/NgoHomeScreen';
import FileScreen from './screens/FileScreen';
import UserReportsScreen from './screens/UserReportsScreen';
import ReportDetailsScreen from './screens/ReportDetailsScreen';
import ReportsScreen from './screens/ReportsScreen';
import NgoReportsScreen from './screens/NgoReportsScreen';
import ReportMapsScreen from './screens/ReportMapsScreen';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerShown: false,
          gestureEnabled: false
        }}/>
        <Stack.Screen name="Choose" component={ChooseScreen} options={{
          headerShown: false,
          gestureEnabled: false
        }}/>
         <Stack.Screen name="Select" component={SelectScreen} options={{
          headerShown: false,
          gestureEnabled: false
        }}/>
        <Stack.Screen name="UserSignup" component={UserSignupScreen} options={{
          headerShown: false,
          gestureEnabled: false
        }}/>
        <Stack.Screen name="NgoSignup" component={NgoSignupScreen} options={{
          headerShown: false,
          gestureEnabled: false
        }}/>
        <Stack.Screen name="UserLogin" component={UserLoginScreen} options={{
          headerShown: false,
          gestureEnabled: false
        }}/>
        <Stack.Screen name="NgoLogin" component={NgoLoginScreen} options={{
          headerShown: false,
          gestureEnabled: false
        }}/>
         <Stack.Screen name="UserHome" component={UserHomeScreen} options={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: false,
        }}/>
        <Stack.Screen name="File" component={FileScreen} options={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: false,
        }}/>
        <Stack.Screen name="UserReports" component={UserReportsScreen} options={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: false,
        }}/>
        <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} options={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
        }}/>
          <Stack.Screen name="NgoHome" component={NgoHomeScreen} options={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: false,
        }}/>
        <Stack.Screen name="Reports" component={ReportsScreen} options={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: false,
        }}/>
        <Stack.Screen name="NgoReports" component={NgoReportsScreen} options={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: false,
        }}/>
         <Stack.Screen name="ReportMaps" component={ReportMapsScreen} options={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: false,
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default App;