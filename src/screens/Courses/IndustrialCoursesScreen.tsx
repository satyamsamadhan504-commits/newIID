import React, {useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  useNavigation,
  type CompositeNavigationProp,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import {
  isServiceCategoryKey,
  openServiceCategory,
} from '../../navigation/openSolutionScreen';
import {SERVICE_CATEGORIES} from '../../navigation/serviceCategories';
import type {
  CoursesStackParamList,
  MainTabParamList,
} from '../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../module/style-guide';
import {noop} from '../../utils';

const CATEGORIES = SERVICE_CATEGORIES;

const PRIMARY_TABS = [
  'Technical',
  'Industrial',
  'Professional',
  'Hobby',
  'IT',
] as const;

const SUB_TABS = [
  'Food Processing',
  'Textile & Apparel Industry',
  'Agro Food Processing',
] as const;

const COURSES = [
  {
    key: 'snack' as const,
    title: 'Extruded Snack Technology',
    description: '(Introduction to the extruded snacks...',
    lectures: 11,
    price: '₹ 1000.00',
    category: 'Food Processing',
    image: images.courseSnack,
  },
  {
    key: 'bakery' as const,
    title: 'Bakery Technology',
    description: '(Introduction to bakery products...',
    lectures: 11,
    price: '₹ 800.00',
    category: 'Food Processing',
    image: images.courseBakery,
  },
  {
    key: 'dough' as const,
    title: 'Dough Based RTC Business',
    description: '(Ready-to-cook dough business basics...',
    lectures: 10,
    price: '₹ 600.00',
    category: 'Food Processing',
    image: images.courseDough,
  },
] as const;

export function IndustrialCoursesScreen() {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        NativeStackNavigationProp<CoursesStackParamList, 'CoursesList'>,
        BottomTabNavigationProp<MainTabParamList>
      >
    >();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [primaryTab, setPrimaryTab] =
    useState<(typeof PRIMARY_TABS)[number]>('Industrial');
  const [subTab, setSubTab] =
    useState<(typeof SUB_TABS)[number]>('Food Processing');

  const courses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return COURSES;
    }
    return COURSES.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        bounces={false}>
        <View style={[styles.hero, {paddingTop: insets.top + spacing.spacing_3}]}>
          <View style={styles.heroHeader}>
            <Pressable
              onPress={() => navigation.navigate('HomeTab')}
              style={styles.backBtn}
              accessibilityRole="button"
              accessibilityLabel="Back">
              <Text style={styles.backChevron}>‹</Text>
            </Pressable>
            <Text style={styles.heroTitle}>Industrial Courses</Text>
            <View style={styles.backBtn} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={styles.categories}>
            {CATEGORIES.map(item => {
              const selected = item.key === 'industrial-courses';
              return (
                <Pressable
                  key={item.key}
                  style={[styles.catTile, selected && styles.catTileSelected]}
                  onPress={() => {
                    if (
                      item.key !== 'industrial-courses' &&
                      isServiceCategoryKey(item.key)
                    ) {
                      openServiceCategory(navigation, item.key);
                    }
                  }}
                  accessibilityRole="button"
                  accessibilityState={{selected}}
                  accessibilityLabel={item.label.replace('\n', ' ')}>
                  <Image
                    source={item.icon}
                    style={styles.catIcon}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      styles.catLabel,
                      selected && styles.catLabelSelected,
                    ]}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.searchBar}>
            <View style={styles.searchLeft}>
              <Image source={images.iconSearch} style={styles.searchIcon} />
            </View>
            <View style={styles.searchMiddle}>
              {searchQuery.length === 0 ? (
                <Text
                  style={styles.searchPlaceholder}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  pointerEvents="none">
                  Search Business Ideas, Courses, DPR reports...
                </Text>
              ) : null}
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
                accessibilityLabel="Search"
                numberOfLines={1}
                multiline={false}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.searchRight}>
              <View style={styles.searchDivider} />
              <Pressable onPress={noop} accessibilityLabel="Voice search">
                <Image source={images.iconMic} style={styles.micIcon} />
              </Pressable>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={styles.primaryTabs}>
            {PRIMARY_TABS.map(tab => {
              const selected = tab === primaryTab;
              return (
                <Pressable
                  key={tab}
                  onPress={() => setPrimaryTab(tab)}
                  style={styles.primaryTab}
                  accessibilityRole="button"
                  accessibilityState={{selected}}>
                  <Text
                    style={[
                      styles.primaryLabel,
                      selected && styles.primaryLabelSelected,
                    ]}>
                    {tab}
                  </Text>
                  {selected ? <View style={styles.primaryUnderline} /> : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.body}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.subTabs}>
            {SUB_TABS.map(tab => {
              const selected = tab === subTab;
              return (
                <Pressable
                  key={tab}
                  onPress={() => setSubTab(tab)}
                  style={[styles.subTab, selected && styles.subTabSelected]}
                  accessibilityRole="button"
                  accessibilityState={{selected}}>
                  <Text
                    style={[
                      styles.subLabel,
                      selected && styles.subLabelSelected,
                    ]}>
                    {tab}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <Text style={styles.resultsCount}>
            ({courses.length}) Results Courses
          </Text>

          <View style={styles.list}>
            {courses.map(item => (
              <Pressable
                key={item.key}
                style={styles.row}
                onPress={() =>
                  navigation.navigate('IndustrialCourseDetails', {
                    title: item.title,
                    category: item.category,
                    price: item.price,
                    imageKey: item.key,
                  })
                }
                accessibilityRole="button"
                accessibilityLabel={item.title}>
                <Image
                  source={item.image}
                  style={styles.thumb}
                  resizeMode="cover"
                />
                <View style={styles.copy}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.desc} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.badge}>
                    <View style={styles.badgeDot} />
                    <Text style={styles.badgeText}>
                      {item.lectures} Lectures
                    </Text>
                  </View>
                </View>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.chevron}>›</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.spacing_8,
  },
  hero: {
    backgroundColor: '#1F4FD8',
    paddingBottom: 0,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.spacing_6,
    paddingHorizontal: spacing.spacing_6,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backChevron: {
    color: colors.white,
    fontSize: 32,
    lineHeight: 32,
    marginTop: -2,
  },
  heroTitle: {
    ...fontStyles.headings.heading_5,
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontSize: 18,
  },
  categories: {
    flexDirection: 'row',
    gap: spacing.spacing_4,
    paddingHorizontal: spacing.spacing_6,
    paddingRight: spacing.spacing_10,
    marginBottom: spacing.spacing_6,
  },
  catTile: {
    width: 82,
    flexShrink: 0,
    backgroundColor: '#163EAE',
    borderRadius: radius.radius_4,
    paddingVertical: spacing.spacing_5,
    paddingHorizontal: spacing.spacing_2,
    alignItems: 'center',
    minHeight: 92,
    gap: spacing.spacing_3,
  },
  catTileSelected: {
    backgroundColor: colors.white,
  },
  catIcon: {
    width: 28,
    height: 28,
  },
  catLabel: {
    ...fontStyles.body.medium.body_4,
    color: colors.white,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 13,
  },
  catLabelSelected: {
    color: colors.primary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.radius_3,
    height: 48,
    paddingHorizontal: spacing.spacing_6,
    marginHorizontal: spacing.spacing_6,
    marginBottom: spacing.spacing_6,
  },
  searchLeft: {
    width: 24,
    flexShrink: 0,
    justifyContent: 'center',
  },
  searchMiddle: {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    height: '100%',
    marginRight: spacing.spacing_3,
  },
  searchRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    gap: spacing.spacing_5,
  },
  searchIcon: {
    width: 16,
    height: 16,
    tintColor: '#0171DD',
  },
  searchPlaceholder: {
    position: 'absolute',
    left: 0,
    right: 0,
    color: colors.disabled_text,
    fontSize: 12,
  },
  searchInput: {
    color: colors.text,
    fontSize: 12,
    padding: 0,
    margin: 0,
    height: 36,
  },
  searchDivider: {
    width: 1.5,
    height: 20,
    backgroundColor: '#B8C0CC',
  },
  micIcon: {
    width: 16,
    height: 16,
    tintColor: '#0171DD',
  },
  body: {
    backgroundColor: colors.surface,
    paddingTop: spacing.spacing_6,
  },
  primaryTabs: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.spacing_8,
    gap: spacing.spacing_8,
    paddingTop: spacing.spacing_6,
  },
  primaryTab: {
    paddingBottom: spacing.spacing_6,
    alignItems: 'center',
  },
  primaryLabel: {
    ...fontStyles.body.medium.body_3,
    color: 'rgba(255, 255, 255, 0.72)',
  },
  primaryLabelSelected: {
    color: colors.white,
  },
  primaryUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    left: 1,
    right: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  subTabs: {
    paddingHorizontal: spacing.spacing_8,
    gap: spacing.spacing_4,
    paddingBottom: spacing.spacing_7,
  },
  subTab: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.radius_full,
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_4,
  },
  subTabSelected: {
    backgroundColor: colors.input_accent,
    borderColor: colors.input_accent,
  },
  subLabel: {
    ...fontStyles.body.medium.body_4,
    color: colors.text,
    fontSize: 12,
  },
  subLabelSelected: {
    color: colors.white,
  },
  resultsCount: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    paddingHorizontal: spacing.spacing_8,
    marginBottom: spacing.spacing_5,
  },
  list: {
    paddingHorizontal: spacing.spacing_8,
    gap: spacing.spacing_9,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_4,
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: radius.radius_3,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
  },
  desc: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_2,
    backgroundColor: '#DFF2FE',
    borderRadius: radius.radius_full,
    paddingHorizontal: spacing.spacing_4,
    paddingVertical: 3,
    marginTop: spacing.spacing_3,
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.input_accent,
  },
  badgeText: {
    ...fontStyles.body.medium.body_4,
    color: '#2B7FFF',
    fontSize: 11,
    lineHeight: 14,
  },
  price: {
    ...fontStyles.body.bold.body_3,
    color: colors.text,
    fontSize: 12,
    lineHeight: 16,
  },
  chevron: {
    color: colors.text_secondary,
    fontSize: 20,
    lineHeight: 22,
    marginLeft: -4,
  },
});
