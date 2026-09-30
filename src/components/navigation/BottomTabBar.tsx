import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  CommonActions,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {images} from '../../assets/images';
import type {MainTabParamList} from '../../navigation/types';
import {colors, fontStyles, spacing} from '../../module/style-guide';

const TAB_ICONS: Record<keyof MainTabParamList, ImageSourcePropType> = {
  Courses: images.tabCourses,
  Solution: images.tabSolution,
  HomeTab: images.tabHome,
  Services: images.tabServices,
  Schemes: images.tabSchemes,
};

const TAB_LABELS: Record<keyof MainTabParamList, string> = {
  Courses: 'Courses',
  Solution: 'Solution',
  HomeTab: 'Home',
  Services: 'Services',
  Schemes: 'Schemes',
};

function navigateToTab(
  navigation: BottomTabBarProps['navigation'],
  route: BottomTabBarProps['state']['routes'][number],
  routeName: keyof MainTabParamList,
  focused: boolean,
) {
  if (routeName === 'Solution') {
    const nested =
      getFocusedRouteNameFromRoute(route) ?? 'SolutionList';
    if (focused && nested === 'SolutionList') {
      return;
    }
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Solution',
        params: {
          state: {
            routes: [{name: 'SolutionList'}],
            index: 0,
          },
        },
      }),
    );
    return;
  }

  if (routeName === 'Courses') {
    const nested = getFocusedRouteNameFromRoute(route) ?? 'CoursesList';
    if (focused && nested === 'CoursesList') {
      return;
    }
    navigation.navigate('Courses', {screen: 'CoursesList'});
    return;
  }

  if (routeName === 'Services') {
    const nested = getFocusedRouteNameFromRoute(route) ?? 'ServicesList';
    if (focused && nested === 'ServicesList') {
      return;
    }
    navigation.navigate('Services', {screen: 'ServicesList'});
    return;
  }

  if (!focused) {
    navigation.navigate(routeName);
  }
}

export function BottomTabBar({state, navigation, insets}: BottomTabBarProps) {
  return (
    <View
      style={[
        styles.bar,
        {paddingBottom: Math.max(insets.bottom, spacing.spacing_4)},
      ]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const routeName = route.name as keyof MainTabParamList;
        const color = focused ? colors.input_accent : colors.disabled_text;

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={{selected: focused}}
            accessibilityLabel={TAB_LABELS[routeName]}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!event.defaultPrevented) {
                navigateToTab(navigation, route, routeName, focused);
              }
            }}
            style={styles.item}>
            <Image
              source={TAB_ICONS[routeName]}
              style={[styles.icon, {tintColor: color}]}
            />
            <Text style={[styles.label, {color}]}>
              {TAB_LABELS[routeName]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.spacing_4,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.spacing_2,
  },
  icon: {
    width: 22,
    height: 22,
  },
  label: {
    ...fontStyles.body.medium.body_4,
    fontSize: 11,
    lineHeight: 14,
  },
});
