import React, {useState} from 'react';
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
  type ImageSourcePropType,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import type {SolutionStackParamList} from '../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../module/style-guide';
import {noop} from '../../utils';

type Props = NativeStackScreenProps<
  SolutionStackParamList,
  'ProjectReportDetails'
>;

const HERO: Record<'oil' | 'sweet', ImageSourcePropType> = {
  oil: images.reportOilHero,
  sweet: images.reportSweet,
};

const OVERVIEW: Record<'oil' | 'sweet', string> = {
  oil: 'The Oil Milling Shop is an essential component of the agro-processing industry, providing a vital service in converting oilseeds into edible oils. With a growing demand for cooking oils in both domestic and commercial markets, establishing an oil milling shop presents a lucrative opportunity for entrepreneurs. This business model not only supports local farmers by creating a market for their oilseeds but also contributes to the economy by generating employment and fostering entrepreneurship.',
  sweet:
    'A sweet shop is a retail establishment dedicated to the production and sale of traditional and modern confectionery. Rising festive demand and everyday snacking habits make this a steady MSME opportunity with room to scale through local branding and custom orders.',
};

const DOWNLOADS = [
  {key: '10', label: '10 Lac'},
  {key: '50', label: '50 Lac'},
] as const;

export function ProjectReportDetailsScreen({navigation, route}: Props) {
  const {title, category, price, projectValue, imageKey} = route.params;
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const overview = OVERVIEW[imageKey];
  const preview = overview.slice(0, 220).trimEnd() + '...';

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        bounces={false}>
        <View style={[styles.hero, {paddingTop: insets.top + spacing.spacing_2}]}>
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
              accessibilityRole="button"
              accessibilityLabel="Back">
              <Text style={styles.backChevron}>‹</Text>
            </Pressable>
            <View style={styles.headerCopy}>
              <Text style={styles.heroTitle}>{title.toUpperCase()}</Text>
              <Text style={styles.heroSubtitle}>{category.toUpperCase()}</Text>
            </View>
            <View style={styles.backBtn} />
          </View>

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
        </View>

        <View style={styles.mediaWrap}>
          <View style={styles.media}>
            <Image
              source={HERO[imageKey]}
              style={styles.mediaImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.priceCard}>
            <View style={styles.priceLeft}>
              <Text style={styles.priceLabel}>Project Value</Text>
              <Text style={styles.priceValue}>{projectValue}</Text>
            </View>
            <Text style={styles.priceAmount}>{price}</Text>
          </View>
        </View>

        <View style={[styles.card, styles.overviewCard]}>
          <Text style={styles.sectionTitle}>Project Overview</Text>
          <Text style={styles.bodyText}>
            {expanded ? overview : preview}{' '}
            <Text
              style={styles.readMore}
              onPress={() => setExpanded(value => !value)}>
              {expanded ? 'Read Less' : 'Read More'}
            </Text>
          </Text>
        </View>

        <View style={[styles.card, styles.cardFollow]}>
          <Text style={styles.sectionTitle}>Download Reports</Text>
          {DOWNLOADS.map(item => (
            <Pressable
              key={item.key}
              style={styles.downloadRow}
              onPress={() =>
                Alert.alert(
                  'Download Report',
                  `${title} ${item.label} report download (demo).`,
                )
              }
              accessibilityRole="button"
              accessibilityLabel={`Download ${title} ${item.label}`}>
              <View style={styles.docIconWrap}>
                <Image
                  source={images.iconReportDoc}
                  style={styles.docIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.downloadCopy}>
                <Text style={styles.downloadTitle}>
                  {title} {item.label}
                </Text>
                <Text style={styles.downloadSubtitle}>Download Report</Text>
              </View>
              <View style={styles.downloadBtn}>
                <Image
                  source={images.iconDownload}
                  style={styles.downloadIcon}
                  resizeMode="contain"
                />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.spacing_12,
  },
  hero: {
    backgroundColor: '#1E4ED8',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: spacing.spacing_6,
    paddingBottom:60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.spacing_6,
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
  headerCopy: {
    flex: 1,
    alignItems: 'center',
  },
  heroTitle: {
    ...fontStyles.headings.heading_5,
    color: colors.white,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...fontStyles.body.regular.body_4,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.radius_3,
    height: 48,
    paddingHorizontal: spacing.spacing_6,
    marginBottom: -16,
    zIndex: 2,
    elevation: 4,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginTop: spacing.spacing_6,
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
  mediaWrap: {
    marginHorizontal: spacing.spacing_6,
    marginTop: -30,
    marginBottom: spacing.spacing_6,
  },
  media: {
    height: 170,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F3EFE6',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  priceCard: {
    position: 'absolute',
    left: spacing.spacing_5,
    right: spacing.spacing_5,
    bottom: -30,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 10,
    
  },
  priceLeft: {
    gap: 2,
  },
  priceLabel: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
  },
  priceValue: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    fontSize: 12,
    lineHeight: 16,
  },
  priceAmount: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 22,
    lineHeight: 26,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    marginHorizontal: spacing.spacing_6,
    padding: spacing.spacing_8,
    gap: spacing.spacing_5,
  },
  overviewCard: {
    marginTop: spacing.spacing_11,
  },
  cardFollow: {
    marginTop: spacing.spacing_6,
  },
  sectionTitle: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 18,
    lineHeight: 24,
  },
  bodyText: {
    ...fontStyles.body.regular.body_3,
    color: colors.text_secondary,
    fontSize: 13,
    lineHeight: 20,
  },
  readMore: {
    ...fontStyles.body.medium.body_3,
    color: colors.input_accent,
  },
  downloadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_4,
  },
  docIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.input_accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docIcon: {
    width: 22,
    height: 22,
  },
  downloadCopy: {
    flex: 1,
    minWidth: 0,
  },
  downloadTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
  },
  downloadSubtitle: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    marginTop: 2,
  },
  downloadBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadIcon: {
    width: 16,
    height: 16,
    tintColor: colors.input_accent,
  },
});
