import type {ImageSourcePropType} from 'react-native';
import {images} from '../assets/images';

export type ServiceCategoryKey =
  | 'business-solution'
  | 'project-report'
  | 'industrial-courses'
  | 'business-services'
  | 'franchise-gateway'
  | 'workshop'
  | 'schemes'
  | 'edp-programme';

export type ServiceCategory = {
  key: ServiceCategoryKey;
  label: string;
  icon: ImageSourcePropType;
};

/** Horizontal category tiles used across Solution / Courses / EDP / Workshops. */
export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  {
    key: 'business-solution',
    label: 'Business\nSolution',
    icon: images.iconBusinessSolution,
  },
  {
    key: 'project-report',
    label: 'Project\nReport',
    icon: images.iconProjectReport,
  },
  {
    key: 'industrial-courses',
    label: 'Industrial\nCourses',
    icon: images.iconIndustrialCourses,
  },
  {
    key: 'business-services',
    label: 'Business\nServices',
    icon: images.iconBusinessServices,
  },
  {
    key: 'franchise-gateway',
    label: 'Franchise\nGateway',
    icon: images.iconFranchiseGateway,
  },
  {
    key: 'workshop',
    label: 'Workshop',
    icon: images.iconWorkshop,
  },
  {
    key: 'schemes',
    label: 'Schemes',
    icon: images.iconSchemes,
  },
  {
    key: 'edp-programme',
    label: 'EDP\nProgramme',
    icon: images.iconEdpProgramme,
  },
] as const;

export function isServiceCategoryKey(key: string): key is ServiceCategoryKey {
  return SERVICE_CATEGORIES.some(item => item.key === key);
}
