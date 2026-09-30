import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/Auth/Login/LoginScreen';
import {OtpScreen} from '../screens/Auth/Otp/OtpScreen';
import {ProfileScreen} from '../screens/Profile/ProfileScreen';
import {SplashScreen} from '../screens/Splash/SplashScreen';
import type {RootStackParamList} from './types';
import {UserDetailsScreen} from '../screens/Auth/userDetails/userDetails';
import {EdpProgrammeScreen} from '../screens/Edp/EdpProgrammeScreen';
import {EdpProgrammeDetailsScreen} from '../screens/Edp/EdpProgrammeDetailsScreen';
import {WorkshopsScreen} from '../screens/Workshops/WorkshopsScreen';
import {WorkshopDetailsScreen} from '../screens/Workshops/WorkshopDetailsScreen';
import {MembershipPlanDetailsScreen} from '../screens/Home/MembershipPlanDetailsScreen';
import {BottomTabNavigator} from './BottomTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="userDetails" component={UserDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EdpProgramme" component={EdpProgrammeScreen} />
        <Stack.Screen
          name="EdpProgrammeDetails"
          component={EdpProgrammeDetailsScreen}
        />
        <Stack.Screen name="Workshops" component={WorkshopsScreen} />
        <Stack.Screen name="WorkshopDetails" component={WorkshopDetailsScreen} />
        <Stack.Screen
          name="MembershipPlanDetails"
          component={MembershipPlanDetailsScreen}
          options={{animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
