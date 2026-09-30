import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  IndustrialCourseDetailsScreen,
  IndustrialCoursesScreen,
} from '../screens/Courses';
import type {CoursesStackParamList} from './types';

const Stack = createNativeStackNavigator<CoursesStackParamList>();

export function CoursesNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="CoursesList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="CoursesList" component={IndustrialCoursesScreen} />
      <Stack.Screen
        name="IndustrialCourseDetails"
        component={IndustrialCourseDetailsScreen}
      />
    </Stack.Navigator>
  );
}

