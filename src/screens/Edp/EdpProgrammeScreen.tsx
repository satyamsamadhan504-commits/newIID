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
import {openServiceCategory} from '../../navigation/openSolutionScreen';
import {SERVICE_CATEGORIES} from '../../navigation/serviceCategories';
import type {RootStackParamList} from '../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../module/style-guide';
import {noop} from '../../utils';

const CATEGORIES = SERVICE_CATEGORIES;

const MODULES = [
  {
    key: 'i',
    numeral: 'I',
    moduleIndex: 1,
    title: 'EDP Programme Orientations',
    fullTitle: 'EDP Programme Orientations',
    videos: 7,
    pdfs: 7,
    progress: 17,
  },
  {
    key: 'ii',
    numeral: 'II',
    moduleIndex: 2,
    title: 'Business Idea Generation, Validation...',
    fullTitle: 'Business Idea Generation, Validation & Business Models',
    videos: 7,
    pdfs: 7,
    progress: 0,
  },
  {
    key: 'iii',
    numeral: 'III',
    moduleIndex: 3,
    title: 'Market Research & Opportunity Analysis',
    fullTitle: 'Market Research & Opportunity Analysis',
    videos: 7,
    pdfs: 7,
    progress: 0,
  },
  {
    key: 'iv',
    numeral: 'IV',
    moduleIndex: 4,
    title: 'Business Model & Financial Planning',
    fullTitle: 'Business Model & Financial Planning',
    videos: 7,
    pdfs: 7,
    progress: 0,
  },
  {
    key: 'v',
    numeral: 'V',
    moduleIndex: 5,
    title: 'Legal Compliances & Schemes',
    fullTitle: 'Legal Compliances & Schemes',
    videos: 7,
    pdfs: 7,
    progress: 0,
  },
] as const;

function formatCount(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

function VideosIcon() {
  return (
    <View style={styles.metaGlyph}>
      <View style={styles.metaPersonHead} />
      <View style={styles.metaPersonBody} />
    </View>
  );
}

function FolderIcon() {
  return (
    <View style={styles.metaGlyph}>
      <View style={styles.metaFolderTab} />
      <View style={styles.metaFolderBody} />
    </View>
  );
}

export function EdpProgrammeScreen() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'EdpProgramme'>
    >();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const modules = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return MODULES;
    }
    return MODULES.filter(item => item.title.toLowerCase().includes(q));
  }, [searchQuery]);

  function openCategory(key: (typeof CATEGORIES)[number]['key']) {
    if (key === 'edp-programme') {
      return;
    }
    openServiceCategory(navigation, key);
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
            <Text style={styles.heroTitle}>EDP Programme</Text>
            <View style={styles.backBtn} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={styles.categories}>
            {CATEGORIES.map(item => {
              const selected = item.key === 'edp-programme';
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

        <View style={styles.body}>
          <Text style={styles.sectionTitle}>EDP Programme Modules</Text>
          <Text style={styles.sectionSubtitle}>
            Choose a module and start your entrepreneurship training journey.
          </Text>

          <View style={styles.list}>
            {modules.map(item => (
              <Pressable
                key={item.key}
                style={styles.moduleRow}
                onPress={() =>
                  navigation.navigate('EdpProgrammeDetails', {
                    moduleIndex: item.moduleIndex,
                    title: item.fullTitle,
                    numeral: item.numeral,
                  })
                }
                accessibilityRole="button"
                accessibilityLabel={item.title}>
                <View style={styles.moduleThumbWrap}>
                  <View style={styles.moduleThumb}>
                    <Text style={styles.moduleNumeral}>{item.numeral}</Text>
                  </View>
                  <View style={styles.moduleBadge}>
                    <Text style={styles.moduleBadgeText}>Module</Text>
                  </View>
                </View>

                <View style={styles.moduleCopy}>
                  <Text style={styles.moduleTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <VideosIcon />
                      <Text style={styles.metaText}>
                        {formatCount(item.videos)} videos
                      </Text>
                    </View>
                    <View style={styles.metaItem}>
                      <FolderIcon />
                      <Text style={styles.metaText}>{item.pdfs} PDFs</Text>
                    </View>
                  </View>
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        {width: `${Math.max(0, Math.min(100, item.progress))}%`},
                      ]}
                    />
                  </View>
                  <View style={styles.progressLabels}>
                    <Text style={styles.progressLabel}>Progress</Text>
                    <Text style={styles.progressLabel}>{item.progress}%</Text>
                  </View>
                </View>

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
    paddingTop: spacing.spacing_10,
  },
  sectionTitle: {
    ...fontStyles.headings.heading_4,
    color: colors.text,
    marginBottom: spacing.spacing_2,
  },
  sectionSubtitle: {
    ...fontStyles.body.regular.body_3,
    color: colors.text_secondary,
    marginBottom: spacing.spacing_9,
    lineHeight: 20,
  },
  list: {
    gap: spacing.spacing_8,
  },
  moduleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.spacing_5,
  },
  moduleThumbWrap: {
    width: 64,
    alignItems: 'center',
  },
  moduleThumb: {
    width: 58,
    height: 58,
    borderRadius: radius.radius_4,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleNumeral: {
    ...fontStyles.headings.heading_3,
    color: colors.white,
    fontSize: 26,
    lineHeight: 30,
  },
  moduleBadge: {
    marginTop: -10,
    backgroundColor: '#F5C518',
    borderRadius: radius.radius_full,
    paddingHorizontal: spacing.spacing_4,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  moduleBadgeText: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 10,
    lineHeight: 12,
  },
  moduleCopy: {
    flex: 1,
    minWidth: 0,
    paddingTop: 2,
  },
  moduleTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    marginBottom: spacing.spacing_3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_6,
    marginBottom: spacing.spacing_4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaGlyph: {
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  metaPersonHead: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.text_secondary,
    marginBottom: 1,
  },
  metaPersonBody: {
    width: 10,
    height: 6,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: colors.text_secondary,
  },
  metaFolderTab: {
    width: 6,
    height: 3,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    backgroundColor: colors.text_secondary,
    alignSelf: 'flex-start',
    marginLeft: 1,
  },
  metaFolderBody: {
    width: 12,
    height: 8,
    borderRadius: 1,
    backgroundColor: colors.text_secondary,
  },
  metaText: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    fontSize: 12,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E8EEF8',
    overflow: 'hidden',
    marginBottom: spacing.spacing_2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.input_accent,
    borderRadius: 2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    fontSize: 11,
  },
  chevron: {
    color: colors.disabled_text,
    fontSize: 28,
    lineHeight: 32,
    marginTop: 8,
    paddingLeft: spacing.spacing_2,
  },
});
