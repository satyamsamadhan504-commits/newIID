import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BusinessSolutionDetailsScreen} from '../screens/Solution/BusinessSolutionDetailsScreen';
import {ProjectReportDetailsScreen} from '../screens/Solution/ProjectReportDetailsScreen';
import {ProjectReportsScreen} from '../screens/Solution/ProjectReportsScreen';
import {SolutionScreen} from '../screens/Solution/SolutionScreen';
import type {SolutionStackParamList} from './types';

const Stack = createNativeStackNavigator<SolutionStackParamList>();

export function SolutionNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SolutionList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SolutionList"
        component={SolutionScreen}
        options={{animation: 'none'}}
      />
      <Stack.Screen
        name="ProjectReports"
        component={ProjectReportsScreen}
        options={{animation: 'none'}}
      />
      <Stack.Screen
        name="ProjectReportDetails"
        component={ProjectReportDetailsScreen}
      />
      <Stack.Screen
        name="BusinessSolutionDetails"
        component={BusinessSolutionDetailsScreen}
      />
    </Stack.Navigator>
  );
}
