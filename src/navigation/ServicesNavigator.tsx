import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BusinessServiceDetailsScreen} from '../screens/Services/BusinessServiceDetailsScreen';
import {ServicesScreen} from '../screens/Services/ServicesScreen';
import type {ServicesStackParamList} from './types';

const Stack = createNativeStackNavigator<ServicesStackParamList>();

export function ServicesNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ServicesList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ServicesList" component={ServicesScreen} />
      <Stack.Screen
        name="BusinessServiceDetails"
        component={BusinessServiceDetailsScreen}
      />
    </Stack.Navigator>
  );
}
