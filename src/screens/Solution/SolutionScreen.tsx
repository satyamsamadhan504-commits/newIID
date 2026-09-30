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

const INDUSTRIES = [
  {
    key: 'paneer',
    title: 'Paneer Making',
    overlay: 'PANEER MAKING',
    description:
      'Paneer making is a lucrative business model in India, capitalizing on the growing demand for dairy...',
    suppliers: 22,
    invest: 'Invest upto 10 Lakhs',
    image: images.solutionPaneer,
  },
  {
    key: 'jaggery',
    title: 'Jaggery Processing',
    overlay: 'JAGGERY PROCESSING',
    description:
      'Jaggery making is a lucrative business model in India, capitalizing on the natural sweetness...',
    suppliers: 18,
    invest: 'Invest upto 10 Lakhs',
    image: images.solutionJaggery,
  },
  {
    key: 'cookies',
    title: 'Cookies',
    overlay: 'COOKIES',
    description:
      'The cookie industry presents a lucrative opportunity for Indian enterprises and MSMEs, catering...',
    suppliers: 10,
    invest: 'Invest upto 10 Lakhs',
    image: images.solutionCookies,
  },
  {
    key: 'bakery',
    title: 'Home-Based Bakery & Confectionery',
    overlay: 'HOME-BASED BAKERY',
    description:
      'Home-based bakery & confectionery is an emerging business model that allows aspiring individuals...',
    suppliers: 3,
    invest: 'Invest upto 10 Lakhs',
    image: images.solutionBakery,
  },
  {
    key: 'biscuit',
    title: 'Biscuit Making',
    overlay: 'BISCUIT MAKING',
    description:
      'Biscuit making is a lucrative business model in India, capitalizing on the ever-growing demand for...',
    suppliers: 42,
    invest: 'Invest upto 10 Lakhs',
    image: images.solutionBiscuit,
  },
  {
    key: 'ketchup',
    title: 'Tomato Ketchup',
    overlay: 'TOMATO KETCHUP',
    description:
      'Tomato ketchup is a versatile condiment widely used in Indian households and restaurants, enhancing...',
    suppliers: 10,
    invest: 'Invest upto 10 Lakhs',
    image: images.solutionKetchup,
  },
  {
    key: 'curd',
    title: 'Curd Making',
    overlay: 'CURD MAKING',
    description:
      'Curd making is a profitable and sustainable business model for dairy-based enterprises...',
    suppliers: 88,
    invest: 'Invest upto 10 Lakhs',
    image: images.solutionCurd,
  },
  {
    key: 'pickle',
    title: 'Pickle Making',
    overlay: 'PICKLE MAKING',
    description:
      'Pickle making is a thriving business model in India, capitalizing on the rich culinary heritage and...',
    suppliers: 2,
    invest: 'Invest upto 10 Lakhs',
    image: images.solutionPickle,
  },
  {
    key: 'namkeen',
    title: 'Namkeen Making',
    overlay: 'NAMKEEN MAKING',
    description:
      'Namkeen making is a lucrative business model in India, capitalizing on the growing demand for savory...',
    suppliers: 62,
    invest: 'Invest upto 10 Lakhs',
    image: images.solutionNamkeen,
  },
  {
    key: 'icecream',
    title: 'Ice Cream Making',
    overlay: 'ICE CREAM MAKING',
    description:
      'Ice cream making is a growing business opportunity in India with strong demand across seasons...',
    suppliers: 15,
    invest: 'Invest upto 10 Lakhs',
    image: images.solutionIcecream,
  },
  {
    key: 'papad',
    title: 'Papad Making',
    overlay: 'PAPAD MAKING',
    description:
      'Papad making is a traditional micro-enterprise that offers low investment and high local demand...',
    suppliers: 27,
    invest: 'Invest upto 10 Lakhs',
    image: images.solutionPapad,
  },
  {
    key: 'spice',
    title: 'Spice Mixing Unit',
    overlay: 'SPICE MIXING',
    description:
      'A spice mixing unit is a scalable food-processing model serving retail and bulk buyers...',
    suppliers: 19,
    invest: 'Invest upto 10 Lakhs',
    image: images.solutionSpice,
  },
  {
    key: 'bread',
    title: 'Bread Making',
    overlay: 'BREAD MAKING',
    description:
      'Bread making is a steady bakery business model with consistent demand from households and stores...',
    suppliers: 31,
    invest: 'Invest upto 10 Lakhs',
    image: images.solutionBread,
  },
] as const;

export function SolutionScreen() {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        NativeStackNavigationProp<SolutionStackParamList, 'SolutionList'>,
        BottomTabNavigationProp<MainTabParamList>
      >
    >();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [primaryTab, setPrimaryTab] =
    useState<(typeof PRIMARY_TABS)[number]>('Service Sector');
  const [subTab, setSubTab] =
    useState<(typeof SUB_TABS)[number]>('Food Processing');

  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return INDUSTRIES;
    }
    return INDUSTRIES.filter(
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
            <Text style={styles.heroTitle}>Business Solution</Text>
            <View style={styles.backBtn} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={styles.categories}>
            {CATEGORIES.map(item => {
              const selected = item.key === 'business-solution';
              return (
                <Pressable
                  key={item.key}
                  style={[styles.catTile, selected && styles.catTileSelected]}
                  onPress={() => {
                    if (
                      item.key !== 'business-solution' &&
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
            ({results.length}) Results Industries
          </Text>

          <View style={styles.list}>
            {results.map(item => (
              <Pressable
                key={item.key}
                style={styles.card}
                onPress={() =>
                  navigation.navigate('BusinessSolutionDetails', {
                    title: item.title,
                    category:
                      item.key === 'paneer'
                        ? 'Dairy & Milk Products'
                        : subTab,
                    description: item.description,
                  })
                }
                accessibilityRole="button"
                accessibilityLabel={item.title}>
                <View style={styles.thumbWrap}>
                  <Image
                    source={item.image}
                    style={styles.thumb}
                    resizeMode="cover"
                  />
                  <View style={styles.thumbOverlay}>
                    <Text style={styles.thumbCaption} numberOfLines={2}>
                      {item.overlay}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardCopy}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.cardDesc} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.metaRow}>
                    <View style={styles.meta}>
                      <Image
                        source={images.iconSuppliers}
                        style={styles.metaIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.metaText}>
                        {item.suppliers} Suppliers
                      </Text>
                    </View>
                    <View style={styles.meta}>
                      <Image
                        source={images.iconInvest}
                        style={styles.metaIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.metaText}>{item.invest}</Text>
                    </View>
                  </View>
                </View>
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
    marginBottom: spacing.spacing_10,
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
    marginVertical: spacing.spacing_2,
    marginBottom: spacing.spacing_8,
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
  resultsCount: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    paddingHorizontal: spacing.spacing_8,
    marginBottom: spacing.spacing_5,
    marginTop: spacing.spacing_8,
  },
  list: {
    paddingHorizontal: spacing.spacing_8,
    gap: spacing.spacing_5,
  },
  card: {
    flexDirection: 'row',
    borderRadius: radius.radius_4,
    padding: spacing.spacing_4,
    gap: spacing.spacing_4,
    backgroundColor: colors.surface,
  },
  thumbWrap: {
    width: 85,
    height: 85,
    borderRadius: radius.radius_3,
    overflow: 'hidden',
  },
  thumb: {
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
  cardCopy: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 2,
    marginTop: spacing.spacing_1,
    
  },
  cardDesc: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    fontSize: 11,
    lineHeight: 15,
    marginBottom: spacing.spacing_3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.spacing_5,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_2,
  },
  metaIcon: {
    width: 14,
    height: 14,
  },
  metaText: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    fontSize: 11,
    lineHeight: 14,
  },
});
