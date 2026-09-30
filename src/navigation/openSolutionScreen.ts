import {
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import type {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  isServiceCategoryKey,
  type ServiceCategoryKey,
} from './serviceCategories';

type SolutionRootScreen = 'SolutionList' | 'ProjectReports';

function getRouteNames(
  navigation: NavigationProp<ParamListBase>,
): string[] | undefined {
  const state = navigation.getState?.() as
    | {routeNames?: string[]; type?: string}
    | undefined;
  return state?.routeNames;
}

function isSolutionStack(navigation: NavigationProp<ParamListBase>) {
  const names = getRouteNames(navigation);
  return (
    !!names?.includes('SolutionList') && !!names?.includes('ProjectReports')
  );
}

function isCoursesStack(navigation: NavigationProp<ParamListBase>) {
  const names = getRouteNames(navigation);
  return !!names?.includes('CoursesList');
}

function navigateRoot(
  navigation: NavigationProp<ParamListBase>,
  name: string,
  params?: object,
) {
  navigation.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}

/** Opens Solution tab on a root list screen without stacking leftovers. */
export function openSolutionScreen(
  navigation: NavigationProp<ParamListBase>,
  screen: SolutionRootScreen = 'SolutionList',
) {
  if (isSolutionStack(navigation)) {
    const state = navigation.getState();
    const current = state?.routes?.[state.index]?.name;
    if (current === screen) {
      return;
    }
    navigation.dispatch(StackActions.replace(screen));
    return;
  }

  navigation.dispatch(
    CommonActions.navigate({
      name: 'Solution',
      params: {
        state: {
          routes: [{name: screen}],
          index: 0,
        },
      },
    }),
  );
}

/** Opens Courses tab on the list screen (clears course details). */
export function openCoursesScreen(navigation: NavigationProp<ParamListBase>) {
  if (isCoursesStack(navigation)) {
    const state = navigation.getState();
    const current = state?.routes?.[state.index]?.name;
    if (current === 'CoursesList') {
      return;
    }
    navigation.dispatch(StackActions.popToTop());
    return;
  }

  navigation.dispatch(
    CommonActions.navigate({
      name: 'Courses',
      params: {
        screen: 'CoursesList',
      },
    }),
  );
}

export function openEdpProgramme(navigation: NavigationProp<ParamListBase>) {
  navigateRoot(navigation, 'EdpProgramme');
}

export function openWorkshops(navigation: NavigationProp<ParamListBase>) {
  navigateRoot(navigation, 'Workshops');
}

export {isServiceCategoryKey};
export type {ServiceCategoryKey};

/** Redirect for every horizontal category tile. */
export function openServiceCategory(
  navigation: NavigationProp<ParamListBase>,
  key: ServiceCategoryKey | string,
) {
  if (!isServiceCategoryKey(key)) {
    return;
  }

  switch (key) {
    case 'business-solution':
      openSolutionScreen(navigation, 'SolutionList');
      return;
    case 'project-report':
      openSolutionScreen(navigation, 'ProjectReports');
      return;
    case 'industrial-courses':
      openCoursesScreen(navigation);
      return;
    case 'business-services':
      navigateRoot(navigation, 'Home', {
        screen: 'Services',
        params: {screen: 'ServicesList'},
      });
      return;
    case 'franchise-gateway':
      navigateRoot(navigation, 'Home', {screen: 'Services'});
      return;
    case 'workshop':
      openWorkshops(navigation);
      return;
    case 'schemes':
      navigateRoot(navigation, 'Home', {screen: 'Schemes'});
      return;
    case 'edp-programme':
      openEdpProgramme(navigation);
      return;
  }
}
