import type {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Otp: {mobileNumber: string};
  Home: NavigatorScreenParams<MainTabParamList> | undefined;
  userDetails: undefined;
  Profile: undefined;
  EdpProgramme: undefined;
  EdpProgrammeDetails: {
    moduleIndex: number;
    title: string;
    numeral?: string;
  };
  Workshops: undefined;
  MembershipPlanDetails: undefined;
  WorkshopDetails: {
    workshopKey: string;
    title: string;
    shortTitle: string;
    date: string;
    time: string;
    fee: string;
    mode: 'online' | 'offline';
    status: 'Upcoming' | 'Past';
  };
};

export type CoursesStackParamList = {
  CoursesList: undefined;
  IndustrialCourseDetails: {
    title: string;
    category: string;
    price: string;
    imageKey: 'snack' | 'bakery' | 'dough';
  };
};

export type ServicesStackParamList = {
  ServicesList: undefined;
  BusinessServiceDetails: {
    serviceKey: string;
    title: string;
    category: string;
    fromFee: string;
  };
};

export type MainTabParamList = {
  Courses: NavigatorScreenParams<CoursesStackParamList> | undefined;
  Solution: NavigatorScreenParams<SolutionStackParamList> | undefined;
  HomeTab: undefined;
  Services: NavigatorScreenParams<ServicesStackParamList> | undefined;
  Schemes: undefined;
};

export type SolutionStackParamList = {
  SolutionList: undefined;
  ProjectReports: undefined;
  ProjectReportDetails: {
    title: string;
    category: string;
    description: string;
    price: string;
    projectValue: string;
    imageKey: 'oil' | 'sweet';
  };
  BusinessSolutionDetails: {
    title: string;
    category: string;
    description: string;
  };
};
