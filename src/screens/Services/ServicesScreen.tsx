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
  MainTabParamList,
  ServicesStackParamList,
} from '../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../module/style-guide';
import {noop} from '../../utils';

const FILTERS = [
  'All Services',
  'Growth Gear',
  'Registration & Licenses',
  'Tax & Compliance',
  'Legal Support',
] as const;

type ServiceItem = {
  key: string;
  title: string;
  description: string;
  fee: string;
  category: (typeof FILTERS)[number];
};

const SERVICES: ServiceItem[] = [
  {
    key: 'pvt-ltd',
    title: 'Private Limited Company',
    description:
      'Register a Pvt Ltd company with end-to-end documentation, DSC and MCA filing support.',
    fee: '₹10,500',
    category: 'Registration & Licenses',
  },
  {
    key: 'fpc',
    title: 'Farmer Producer Company',
    description:
      'Complete FPC incorporation assistance including bylaws, DIN, DSC and ROC compliance.',
    fee: '₹21,500',
    category: 'Registration & Licenses',
  },
  {
    key: 'llp',
    title: 'Limited Liability Partnership',
    description:
      'LLP registration with deed drafting, partner DIN and MCA portal filing guidance.',
    fee: '₹8,999',
    category: 'Registration & Licenses',
  },
  {
    key: 'gst',
    title: 'GST Registration',
    description:
      'Get GSTIN quickly with document checklist, portal filing and follow-up support.',
    fee: '₹2,499',
    category: 'Registration & Licenses',
  },
  {
    key: 'udyam',
    title: 'Udyam MSME Registration',
    description:
      'MSME/Udyam registration support for eligibility, filing and certificate delivery.',
    fee: '₹1,499',
    category: 'Registration & Licenses',
  },
  {
    key: 'growth-pitch',
    title: 'Business Growth Mentorship',
    description:
      'Structured mentoring for MSMEs covering sales systems, branding and scale-up planning.',
    fee: '₹7,500',
    category: 'Growth Gear',
  },
  {
    key: 'tax-itr',
    title: 'ITR Filing Support',
    description:
      'Assisted income-tax return filing with document review and compliance checks.',
    fee: '₹1,999',
    category: 'Tax & Compliance',
  },
  {
    key: 'legal-mou',
    title: 'MOU / Agreement Drafting',
    description:
      'Custom legal drafting for partnerships, vendors and service agreements.',
    fee: '₹4,500',
    category: 'Legal Support',
  },
];

const ACCENT = '#067FF3';
const CARD_BORDER = '#D6E6F8';

function EyeIcon() {
  return (
    <View style={iconStyles.eyeOuter}>
      <View style={iconStyles.eyeInner} />
    </View>
  );
}

export function ServicesScreen() {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        NativeStackNavigationProp<ServicesStackParamList, 'ServicesList'>,
        BottomTabNavigationProp<MainTabParamList>
      >
    >();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]>('Registration & Licenses');

  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SERVICES.filter(item => {
      const matchesFilter =
        activeFilter === 'All Services' || item.category === activeFilter;
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.fee.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        bounces={false}>
        <View
          style={[styles.hero, {paddingTop: insets.top + spacing.spacing_3}]}>
          <View style={styles.heroHeader}>
            <Pressable
              onPress={() => navigation.navigate('HomeTab')}
              style={styles.backBtn}
              accessibilityRole="button"
              accessibilityLabel="Back">
              <Text style={styles.backChevron}>‹</Text>
            </Pressable>
            <Text style={styles.heroTitle}>Business Service</Text>
            <View style={styles.backBtn} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={styles.categories}>
            {SERVICE_CATEGORIES.map(item => {
              const selected = item.key === 'business-services';
              return (
                <Pressable
                  key={item.key}
                  style={[styles.catTile, selected && styles.catTileSelected]}
                  onPress={() => {
                    if (
                      item.key !== 'business-services' &&
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
                accessibilityLabel="Search services"
                placeholderTextColor={colors.disabled_text}
              />
            </View>
            <View style={styles.searchRight}>
              <View style={styles.searchDivider} />
              <Pressable onPress={noop} accessibilityLabel="Voice search">
                <Image source={images.iconMic} style={styles.micIcon} />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={styles.filters}>
            {FILTERS.map(filter => {
              const selected = filter === activeFilter;
              return (
                <Pressable
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  style={[styles.filterChip, selected && styles.filterChipSelected]}
                  accessibilityRole="button"
                  accessibilityState={{selected}}>
                  <Text
                    style={[
                      styles.filterLabel,
                      selected && styles.filterLabelSelected,
                    ]}
                    numberOfLines={1}>
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <Text style={styles.resultsLabel}>
            ({results.length}) Results Courses
          </Text>

          <View style={styles.list}>
            {results.map(item => (
              <Pressable
                key={item.key}
                style={styles.card}
                onPress={() =>
                  navigation.navigate('BusinessServiceDetails', {
                    serviceKey: item.key,
                    title: item.title,
                    category: item.category,
                    fromFee: item.key === 'pvt-ltd' ? '₹ 10,000' : item.fee,
                  })
                }
                accessibilityRole="button"
                accessibilityLabel={item.title}>
                <View style={styles.cardTop}>
                  <View style={styles.serviceIconWrap}>
                    <Image
                      source={images.iconRocket}
                      style={styles.serviceIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.cardCopy}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDesc} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardBottom}>
                  <View style={styles.feeCol}>
                    <Text style={styles.metaLabel}>Service Fee</Text>
                    <Text style={styles.feeValue}>{item.fee}</Text>
                    <Text style={styles.gstNote}>GST exclusive</Text>
                  </View>

                  <View style={styles.checklistCol}>
                    <Text style={styles.metaLabel}>Document Checklist</Text>
                    <Pressable
                      style={styles.checklistBtn}
                      onPress={noop}
                      accessibilityRole="button"
                      accessibilityLabel="View Checklist">
                      <EyeIcon />
                      <Text style={styles.checklistText}>View Checklist</Text>
                    </Pressable>
                  </View>

                  <Pressable
                    style={styles.arrowBtn}
                    onPress={() =>
                      navigation.navigate('BusinessServiceDetails', {
                        serviceKey: item.key,
                        title: item.title,
                        category: item.category,
                        fromFee: item.key === 'pvt-ltd' ? '₹ 10,000' : item.fee,
                      })
                    }
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel={`Open ${item.title}`}>
                    <View style={styles.arrowShaft} />
                    <View style={styles.arrowHead} />
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const iconStyles = StyleSheet.create({
  eyeOuter: {
    width: 15,
    height: 10,
    borderRadius: 8,
    borderWidth: 1.4,
    borderColor: '#3F4A56',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeInner: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3F4A56',
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.spacing_11,
  },
  hero: {
    backgroundColor: colors.primary,
    paddingBottom: spacing.spacing_8,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.spacing_4,
    marginBottom: spacing.spacing_6,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backChevron: {
    color: colors.white,
    fontSize: 32,
    lineHeight: 36,
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
    paddingTop: spacing.spacing_7,
  },
  filters: {
    flexDirection: 'row',
    gap: spacing.spacing_3,
    paddingHorizontal: spacing.spacing_8,
    paddingRight: spacing.spacing_10,
    marginBottom: spacing.spacing_6,
  },
  filterChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_4,
  },
  filterChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterLabel: {
    ...fontStyles.body.medium.body_4,
    color: colors.text,
    fontSize: 12,
  },
  filterLabelSelected: {
    color: colors.white,
  },
  resultsLabel: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    paddingHorizontal: spacing.spacing_8,
    marginBottom: spacing.spacing_6,
  },
  list: {
    paddingHorizontal: spacing.spacing_8,
    gap: spacing.spacing_6,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.radius_4,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    paddingHorizontal: spacing.spacing_8,
    paddingTop: spacing.spacing_9,
    paddingBottom: spacing.spacing_8,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.spacing_8,
    marginBottom: spacing.spacing_10,
  },
  serviceIconWrap: {
    width: 58,
    height: 58,
    borderRadius: radius.radius_3,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceIcon: {
    width: 26,
    height: 26,
  },
  cardCopy: {
    flex: 1,
    minWidth: 0,
    paddingTop: spacing.spacing_1,
  },
  cardTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: spacing.spacing_3,
  },
  cardDesc: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    fontSize: 12,
    lineHeight: 18,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: spacing.spacing_2,
  },
  feeCol: {
    flex: 1,
  },
  checklistCol: {
    flex: 1.35,
  },
  metaLabel: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    fontSize: 13,
    marginBottom: spacing.spacing_6,
  },
  feeValue: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 16,
    lineHeight: 20,
  },
  gstNote: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    fontSize: 10,
    marginTop: spacing.spacing_2,
  },
  checklistBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_4,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: radius.radius_full,
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_5,
  },
  checklistText: {
    ...fontStyles.body.medium.body_4,
    color: colors.text,
    fontSize: 12,
  },
  arrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.spacing_4,
  },
  arrowShaft: {
    position: 'absolute',
    width: 11,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.white,
    left: 8,
  },
  arrowHead: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.white,
    transform: [{rotate: '45deg'}],
    right: 8,
  },
});
