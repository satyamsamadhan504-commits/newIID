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
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import {
  openServiceCategory,
  type ServiceCategoryKey,
} from '../../navigation/openSolutionScreen';
import {SERVICE_CATEGORIES} from '../../navigation/serviceCategories';
import type {RootStackParamList} from '../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../module/style-guide';
import {noop} from '../../utils';
import {
  DEFAULT_WORKSHOP_FILTERS,
  WorkshopFilterModal,
  type WorkshopFilterValues,
  type WorkshopMode,
} from './WorkshopFilterModal';

const TABS = ['Upcoming Workshops', 'Past Workshops'] as const;

type WorkshopItem = {
  key: string;
  title: string;
  date: string;
  time: string;
  fee: string;
  price: number;
  mode: Exclude<WorkshopMode, 'both'>;
  image: (typeof images)[keyof typeof images];
};

const PAST_WORKSHOPS: WorkshopItem[] = [
  {
    key: 'milk',
    title: 'Workshop on Milk Processing',
    date: '28 Sep, 2026',
    time: '4:00 PM to 6:00 PM',
    fee: '₹ 590.00',
    price: 590,
    mode: 'online',
    image: images.solutionPaneer,
  },
  {
    key: 'spice',
    title: 'Workshop on Spice Mixing',
    date: '22 Sep, 2026',
    time: '2:00 PM to 4:00 PM',
    fee: '₹ 490.00',
    price: 490,
    mode: 'offline',
    image: images.solutionSpice,
  },
  {
    key: 'biscuit',
    title: 'Workshop on Biscuit Making',
    date: '18 Sep, 2026',
    time: '11:00 AM to 1:00 PM',
    fee: '₹ 690.00',
    price: 690,
    mode: 'online',
    image: images.workshopBiscuit,
  },
  {
    key: 'pickle',
    title: 'Workshop on Pickle Making',
    date: '12 Sep, 2026',
    time: '3:00 PM to 5:00 PM',
    fee: '₹ 390.00',
    price: 390,
    mode: 'offline',
    image: images.solutionPickle,
  },
  {
    key: 'bakery',
    title: 'Workshop on Home Bakery',
    date: '05 Sep, 2026',
    time: '10:00 AM to 12:00 PM',
    fee: '₹ 790.00',
    price: 790,
    mode: 'online',
    image: images.solutionBakery,
  },
];

const UPCOMING_WORKSHOPS: WorkshopItem[] = [
  {
    key: 'up-noodles',
    title: 'Workshop on Ready to Eat Noodles',
    date: '02 Oct, 2026',
    time: '11:00 AM to 1:00 PM',
    fee: '₹ 590.00',
    price: 590,
    mode: 'online',
    image: images.solutionNamkeen,
  },
  {
    key: 'up-jaggery',
    title: 'Workshop on Jaggery Processing',
    date: '05 Oct, 2026',
    time: '4:00 PM to 6:00 PM',
    fee: '₹ 490.00',
    price: 490,
    mode: 'offline',
    image: images.solutionJaggery,
  },
  {
    key: 'up-icecream',
    title: 'Workshop on Ice Cream Making',
    date: '08 Oct, 2026',
    time: '2:00 PM to 4:00 PM',
    fee: '₹ 690.00',
    price: 690,
    mode: 'online',
    image: images.solutionIcecream,
  },
];

function applyWorkshopFilters(
  list: readonly WorkshopItem[],
  filters: WorkshopFilterValues,
  searchQuery: string,
) {
  const q = searchQuery.trim().toLowerCase();

  let next = list.filter(item => {
    const matchesMode =
      filters.mode === 'both' || item.mode === filters.mode;
    const matchesPrice =
      item.price >= filters.priceMin && item.price <= filters.priceMax;
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.fee.toLowerCase().includes(q) ||
      item.date.toLowerCase().includes(q) ||
      item.mode.includes(q);

    return matchesMode && matchesPrice && matchesSearch;
  });

  next = [...next].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-desc':
        return b.price - a.price;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'price-asc':
      default:
        return a.price - b.price;
    }
  });

  return next;
}

export function WorkshopsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Workshops'>>();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>('Past Workshops');
  const [filterVisible, setFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<WorkshopFilterValues>(
    DEFAULT_WORKSHOP_FILTERS,
  );

  const sourceList =
    activeTab === 'Past Workshops' ? PAST_WORKSHOPS : UPCOMING_WORKSHOPS;

  const results = useMemo(
    () => applyWorkshopFilters(sourceList, appliedFilters, searchQuery),
    [sourceList, appliedFilters, searchQuery],
  );

  function openCategory(key: ServiceCategoryKey) {
    if (key === 'workshop') {
      return;
    }
    openServiceCategory(navigation, key);
  }

  function handleFilterReset() {
    setAppliedFilters(DEFAULT_WORKSHOP_FILTERS);
    setFilterVisible(false);
  }

  function handleFilterConfirm(values: WorkshopFilterValues) {
    setAppliedFilters(values);
    setFilterVisible(false);
  }

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
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
              accessibilityRole="button"
              accessibilityLabel="Back">
              <Text style={styles.backChevron}>‹</Text>
            </Pressable>
            <Text style={styles.heroTitle}>Workshops & Webinars</Text>
            <View style={styles.backBtn} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={styles.categories}>
            {SERVICE_CATEGORIES.map(item => {
              const selected = item.key === 'workshop';
              return (
                <Pressable
                  key={item.key}
                  style={[styles.catTile, selected && styles.catTileSelected]}
                  onPress={() => openCategory(item.key)}
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
                  Search workshop by title, topic or fee...
                </Text>
              ) : null}
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
                accessibilityLabel="Search workshops"
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
          <View style={styles.tabsRow}>
            <View style={styles.tabs}>
              {TABS.map(tab => {
                const selected = tab === activeTab;
                return (
                  <Pressable
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    style={[styles.tab, selected && styles.tabSelected]}
                    accessibilityRole="button"
                    accessibilityState={{selected}}>
                    <Text
                      style={[
                        styles.tabLabel,
                        selected && styles.tabLabelSelected,
                      ]}>
                      {tab}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              style={styles.filterBtn}
              onPress={() => setFilterVisible(true)}
              accessibilityRole="button"
              accessibilityLabel="Filter workshops">
              <Image
                source={images.iconFilter}
                style={styles.filterIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>{activeTab}</Text>
          <Text style={styles.sectionSubtitle}>
            ({results.length}) Results Workshop
          </Text>

          <View style={styles.list}>
            {results.map(item => (
              <Pressable
                key={item.key}
                style={styles.card}
                onPress={() =>
                  navigation.navigate('WorkshopDetails', {
                    workshopKey: item.key,
                    title: item.title,
                    shortTitle: item.title
                      .replace(/^Workshop on\s+/i, '')
                      .trim(),
                    date: item.date,
                    time: item.time.replace(' to ', ' – '),
                    fee: item.fee,
                    mode: item.mode,
                    status:
                      activeTab === 'Past Workshops' ? 'Past' : 'Upcoming',
                  })
                }
                accessibilityRole="button"
                accessibilityLabel={item.title}>
                <Image
                  source={item.image}
                  style={styles.thumb}
                  resizeMode="cover"
                />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.cardMeta}>
                    • {item.date}  • {item.time}
                  </Text>
                  <View style={styles.cardFooter}>
                    <View style={styles.feeCol}>
                      <Text style={styles.feeLabel}>Workshop Fee</Text>
                      <Text style={styles.feeValue}>{item.fee}</Text>
                    </View>
                    <View style={styles.actions}>
                      <Pressable
                        style={styles.actionBtn}
                        onPress={noop}
                        accessibilityRole="button"
                        accessibilityLabel="Download material">
                        <Image
                          source={images.iconDownload}
                          style={styles.actionIcon}
                          resizeMode="contain"
                        />
                      </Pressable>
                      <Pressable
                        style={styles.actionBtn}
                        onPress={noop}
                        accessibilityRole="button"
                        accessibilityLabel="Download recording">
                        <Image
                          source={images.iconDownload}
                          style={styles.actionIcon}
                          resizeMode="contain"
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <WorkshopFilterModal
        visible={filterVisible}
        initialValues={appliedFilters}
        onClose={() => setFilterVisible(false)}
        onReset={handleFilterReset}
        onConfirm={handleFilterConfirm}
      />
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
    paddingHorizontal: spacing.spacing_8,
    paddingTop: spacing.spacing_8,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_4,
    marginBottom: spacing.spacing_8,
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.spacing_3,
  },
  tab: {
    flexShrink: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.spacing_5,
    paddingVertical: spacing.spacing_4,
  },
  tabSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabLabel: {
    ...fontStyles.body.medium.body_4,
    color: colors.text,
    fontSize: 11,
  },
  tabLabelSelected: {
    color: colors.white,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    width: 18,
    height: 18,
    tintColor: colors.white,
  },
  sectionTitle: {
    ...fontStyles.headings.heading_4,
    color: colors.text,
    marginBottom: spacing.spacing_1,
    fontSize: 16,
  },
  sectionSubtitle: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    marginBottom: spacing.spacing_8,
  },
  list: {
    gap: spacing.spacing_8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.spacing_5,
  },
  thumb: {
    width: 88,
    height: 88,
    borderRadius: radius.radius_4,
  },
  cardBody: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 14,
  },
  cardMeta: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    fontSize: 10,
    marginBottom: spacing.spacing_2,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  feeCol: {
    gap: 1,
  },
  feeLabel: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    fontSize: 10,
  },
  feeValue: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.spacing_3,
  },
  actionBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 0.8,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    width: 14,
    height: 14,
    tintColor: '#2B7FFF',
  },
});
