import React from 'react';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {BottomTabBar} from '../components/navigation/BottomTabBar';
import {HomeScreen} from '../screens/Home/HomeScreen';
import {SchemesScreen} from '../screens/Schemes/SchemesScreen';
import type {MainTabParamList} from './types';
import {CoursesNavigator} from './CoursesNavigator';
import {ServicesNavigator} from './ServicesNavigator';
import {SolutionNavigator} from './SolutionNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

function renderTabBar(props: BottomTabBarProps) {
  const focused = props.state.routes[props.state.index];
  const nested =
    getFocusedRouteNameFromRoute(focused) ??
    (focused.name === 'Courses' ? 'CoursesList' : '');

  if (
    focused.name === 'Courses' &&
    nested === 'IndustrialCourseDetails'
  ) {
    return null;
  }

  return <BottomTabBar {...props} />;
}

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      backBehavior="history"
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Courses" component={CoursesNavigator} />
      <Tab.Screen name="Solution" component={SolutionNavigator} />
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="Services" component={ServicesNavigator} />
      <Tab.Screen name="Schemes" component={SchemesScreen} />
    </Tab.Navigator>
  );
}

