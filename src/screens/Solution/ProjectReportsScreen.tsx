import React, {useMemo, useState} from 'react';
import {
  Alert,
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
  MainTabParamList,
  SolutionStackParamList,
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
  'Manufacturing',
  'Service Sector',
  'Franchise',
  'Business Opportunities',
] as const;

const SUB_TABS = [
  'Agri & Agri Food Business',
  'Food Processing',
  'Small Business Manufacturing',
] as const;

const REPORTS = [
  {
    key: 'oil' as const,
    title: 'Oil Milling Shop',
    overlay: 'OIL\nMILLING SHOP',
    category: 'Oil Milling & Processing',
    description: 'The Oil Milling Shop is an essential component of the...',
    price: '₹ 500.00',
    projectValue: '₹ 22.20 Lacs',
    image: images.reportOil,
  },
  {
    key: 'sweet' as const,
    title: 'Sweet Shop',
    overlay: 'SWEET\nSHOP',
    category: 'Food Processing',
    description:
      'A sweet shop is a retail establishment dedicated to the production...',
    price: '₹ 500.00',
    projectValue: '₹ 18.50 Lacs',
    image: images.reportSweet,
  },
] as const;

export function ProjectReportsScreen() {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        NativeStackNavigationProp<SolutionStackParamList, 'ProjectReports'>,
        BottomTabNavigationProp<MainTabParamList>
      >
    >();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [primaryTab, setPrimaryTab] =
    useState<(typeof PRIMARY_TABS)[number]>('Service Sector');
  const [subTab, setSubTab] =
    useState<(typeof SUB_TABS)[number]>('Food Processing');

  const reports = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return REPORTS;
    }
    return REPORTS.filter(
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
            <Text style={styles.heroTitle}>Project Reports</Text>
            <View style={styles.backBtn} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={styles.categories}>
            {CATEGORIES.map(item => {
              const selected = item.key === 'project-report';
              return (
                <Pressable
                  key={item.key}
                  style={[styles.catTile, selected && styles.catTileSelected]}
                  onPress={() => {
                    if (
                      item.key !== 'project-report' &&
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

          <View style={styles.promo}>
            <View style={styles.promoCopy}>
              <Text style={styles.promoTitle}>
                Get a Customized Bankable Project Report
              </Text>
              <Text style={styles.promoSubtitle}>
                Industry-specific DPR prepared by CAs for loans, subsidies &
                investor pitch.
              </Text>
              <Pressable
                style={styles.promoBtn}
                onPress={() =>
                  Alert.alert(
                    'Customized Report',
                    'Requesting a bankable project report (demo).',
                  )
                }
                accessibilityRole="button">
                <Text style={styles.promoBtnText}>Customized Now</Text>
              </Pressable>
            </View>
            <Image
              source={images.projectReportBanner}
              style={styles.promoArt}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.resultsCount}>
            ({String(reports.length).padStart(2, '0')}) Results Reports
          </Text>

          <View style={styles.reportList}>
            {reports.map(item => (
              <Pressable
                key={item.key}
                style={styles.reportRow}
                onPress={() =>
                  navigation.navigate('ProjectReportDetails', {
                    title: item.title,
                    category: item.category,
                    description: item.description,
                    price: item.price,
                    projectValue: item.projectValue,
                    imageKey: item.key,
                  })
                }
                accessibilityRole="button"
                accessibilityLabel={item.title}>
                <View style={styles.reportThumbWrap}>
                  <Image
                    source={item.image}
                    style={styles.reportThumb}
                    resizeMode="cover"
                  />
                  <View style={styles.thumbOverlay}>
                    <Text style={styles.thumbCaption} numberOfLines={2}>
                      {item.overlay}
                    </Text>
                  </View>
                </View>
                <View style={styles.reportCopy}>
                  <Text style={styles.reportTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.reportDesc} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
                <Text style={styles.reportPrice}>{item.price}</Text>
                <Text style={styles.reportChevron}>›</Text>
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
    left: 8,
    right: 8,
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
  promo: {
    marginHorizontal: spacing.spacing_8,
    marginBottom: spacing.spacing_8,
    backgroundColor: '#EDF2FB',
    borderRadius: 18,
    minHeight: 148,
    padding: spacing.spacing_7,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  promoCopy: {
    flex: 1,
    paddingRight: 96,
    gap: spacing.spacing_3,
  },
  promoTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 12,
    lineHeight: 16,
  },
  promoSubtitle: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    fontSize: 11,
    lineHeight: 16,
  },
  promoBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: radius.radius_2,
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_3,
    marginTop: spacing.spacing_3,
  },
  promoBtnText: {
    ...fontStyles.body.medium.body_4,
    color: colors.text,
    fontSize: 12,
  },
  promoArt: {
    position: 'absolute',
    right: 4,
    bottom: 0,
    width: 120,
    height: 120,
  },
  resultsCount: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    paddingHorizontal: spacing.spacing_8,
    marginBottom: spacing.spacing_5,
  },
  reportList: {
    paddingHorizontal: spacing.spacing_8,
    gap: spacing.spacing_7,
  },
  reportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_4,
  },
  reportThumbWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.radius_3,
    overflow: 'hidden',
  },
  reportThumb: {
    width: '100%',
    height: '100%',
  },
  thumbOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  thumbCaption: {
    ...fontStyles.body.bold.body_3,
    color: colors.white,
    fontSize: 8,
    lineHeight: 10,
    textAlign: 'center',
  },
  reportCopy: {
    flex: 1,
    minWidth: 0,
  },
  reportTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
  },
  reportDesc: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    fontSize: 11,
    lineHeight: 15,
    marginTop: 2,
  },
  reportPrice: {
    ...fontStyles.body.bold.body_3,
    color: colors.text,
    fontSize: 12,
    lineHeight: 16,
  },
  reportChevron: {
    color: colors.text_secondary,
    fontSize: 20,
    lineHeight: 22,
    marginLeft: -4,
  },
});
