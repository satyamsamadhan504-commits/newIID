import React, {useMemo, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {RouteProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import type {RootStackParamList} from '../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../module/style-guide';

type Nav = NativeStackNavigationProp<
  RootStackParamList,
  'EdpProgrammeDetails'
>;
type R = RouteProp<RootStackParamList, 'EdpProgrammeDetails'>;

const TOTAL_MODULES = 22;

const MODULE_CHIPS = Array.from({length: 8}, (_, i) => i + 1);

const LECTURES = [
  {
    id: 1,
    title: 'Sources of New Idea',
    duration: '10 Min',
    done: true,
  },
  {
    id: 2,
    title: 'Methods of Generating An Idea',
    duration: '13 Min',
    done: true,
  },
  {
    id: 3,
    title: 'Creative Problem Solving',
    duration: '16 Min',
    done: false,
    active: true,
  },
  {
    id: 4,
    title: 'Opportunity Recognition',
    duration: '19 Min',
    done: false,
  },
  {
    id: 5,
    title: 'Steps for Idea Validation',
    duration: '22 Min',
    done: false,
  },
  {
    id: 6,
    title: 'Prototype and Minimum Viable Product (MVP)',
    duration: '10 Min',
    done: false,
  },
  {
    id: 7,
    title: 'The Business Process Flow Chart',
    duration: '13 Min',
    done: false,
  },
  {
    id: 8,
    title: 'Product Planning and Development',
    duration: '10 Min',
    done: false,
  },
  {
    id: 9,
    title: 'Business Model Canvas Basics',
    duration: '14 Min',
    done: false,
  },
  {
    id: 10,
    title: 'Revenue Streams & Cost Structure',
    duration: '12 Min',
    done: false,
  },
  {
    id: 11,
    title: 'Customer Segments & Value Proposition',
    duration: '15 Min',
    done: false,
  },
  {
    id: 12,
    title: 'Go-to-Market Strategy',
    duration: '11 Min',
    done: false,
  },
  {
    id: 13,
    title: 'Pitch Deck Essentials',
    duration: '18 Min',
    done: false,
  },
  {
    id: 14,
    title: 'Module Recap & Next Steps',
    duration: '9 Min',
    done: false,
  },
] as const;

function ProgressIcon() {
  return (
    <View style={styles.progressIcon}>
      <View style={[styles.bar, styles.bar1]} />
      <View style={[styles.bar, styles.bar2]} />
      <View style={[styles.bar, styles.bar3]} />
    </View>
  );
}

function LockIcon() {
  return (
    <View style={styles.lockIcon}>
      <View style={styles.lockShackle} />
      <View style={styles.lockBody}>
        <View style={styles.lockKeyhole} />
      </View>
    </View>
  );
}

const RESOURCES = [
  {
    id: 1,
    lecture: 'Lecture 2',
    fileName: 'compelling_overriding.pdf',
  },
  {
    id: 2,
    lecture: 'Lecture 2',
    fileName: 'enhanced_producer.pdf',
  },
  {
    id: 3,
    lecture: 'Lecture 2',
    fileName: 'business_idea_notes.pdf',
  },
  {
    id: 4,
    lecture: 'Lecture 3',
    fileName: 'validation_checklist.pdf',
  },
] as const;

function BookIcon() {
  return (
    <View style={styles.bookIcon}>
      <View style={styles.bookSpine} />
      <View style={styles.bookPages}>
        <View style={styles.bookLine} />
        <View style={styles.bookLine} />
        <View style={styles.bookLineShort} />
      </View>
    </View>
  );
}

export function EdpProgrammeDetailsScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<R>();
  const insets = useSafeAreaInsets();
  const initialModule = route.params?.moduleIndex ?? 2;
  const [selectedModule, setSelectedModule] = useState(initialModule);
  const [tab, setTab] = useState<'Content' | 'Resources'>('Content');

  const completed = useMemo(
    () => LECTURES.filter(item => item.done).length,
    [],
  );
  const totalLectures = LECTURES.length;
  const progressPct = Math.round((completed / totalLectures) * 100);

  const moduleTitle =
    route.params?.title ??
    'Business Idea Generation, Validation & Business Models';

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}>
        <View
          style={[styles.hero, {paddingTop: insets.top + spacing.spacing_2}]}>
          <View style={styles.heroHeader}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
              accessibilityRole="button"
              accessibilityLabel="Back">
              <Text style={styles.backChevron}>‹</Text>
            </Pressable>
            <View style={styles.heroHeaderCenter}>
              <Text style={styles.moduleEyebrow}>
                MODULE {selectedModule}
              </Text>
              <Text style={styles.moduleOf}>
                Module {selectedModule} of {TOTAL_MODULES}
              </Text>
            </View>
            <View style={styles.backBtn} />
          </View>

          <Text style={styles.heroTitle}>{moduleTitle}</Text>

          <View style={styles.tabs}>
            {(['Content', 'Resources'] as const).map(item => {
              const selected = tab === item;
              return (
                <Pressable
                  key={item}
                  style={styles.tab}
                  onPress={() => setTab(item)}
                  accessibilityRole="button"
                  accessibilityState={{selected}}>
                  <Text
                    style={[styles.tabLabel, selected && styles.tabLabelActive]}>
                    {item}
                  </Text>
                  {selected ? <View style={styles.tabUnderline} /> : null}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.body}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chips}>
            {MODULE_CHIPS.map(n => {
              const selected = n === selectedModule;
              return (
                <Pressable
                  key={n}
                  style={[styles.chip, selected && styles.chipSelected]}
                  onPress={() => setSelectedModule(n)}
                  accessibilityRole="button"
                  accessibilityState={{selected}}>
                  <Text
                    style={[
                      styles.chipText,
                      selected && styles.chipTextSelected,
                    ]}>
                    Module {n}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {tab === 'Content' ? (
            <>
              <View style={styles.card}>
                <View style={styles.progressHeader}>
                  <ProgressIcon />
                  <Text style={styles.cardTitle}>Your Study Progress</Text>
                </View>
                <View style={styles.progressStats}>
                  <Text style={styles.progressStatText}>
                    {completed} of {totalLectures} lectures completed
                  </Text>
                  <Text style={styles.progressStatText}>{progressPct}%</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.max(0, Math.min(100, progressPct))}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressHint}>
                  Track section completion and continue where you left off.
                </Text>

                <View style={styles.lockBox}>
                  <LockIcon />
                  <View style={styles.lockCopy}>
                    <Text style={styles.lockTitle}>Module Assessments</Text>
                    <Text style={styles.lockSubtitle}>
                      The module assessment unlocks after all lectures are
                      complete.
                    </Text>
                  </View>
                </View>
              </View>

              <Pressable
                style={styles.videoThumb}
                onPress={() => Alert.alert('Play', 'Demo video playback')}
                accessibilityRole="button"
                accessibilityLabel="Play lecture video">
                <Image
                  source={images.edpVideoThumb}
                  style={styles.videoImage}
                  resizeMode="stretch"
                />
                <View style={styles.playBtn}>
                  <View style={styles.playTriangle} />
                </View>
                <View style={styles.durationPill}>
                  <Text style={styles.durationText}>16:23</Text>
                </View>
              </Pressable>

              <View style={styles.overviewCard}>
                <Text style={styles.videoTitle}>
                  MODULE I : EDP Programme Orientations – Overview
                </Text>
                <Text style={styles.videoSubtitle}>
                  Structured EDP module for entrepreneurship development
                </Text>
              </View>

              <View style={styles.contentCard}>
                <Text style={styles.contentTitle}>Course Content</Text>
                <View style={styles.lessonList}>
                  {LECTURES.map(lesson => {
                    const active = Boolean(
                      'active' in lesson && lesson.active,
                    );
                    return (
                      <Pressable
                        key={lesson.id}
                        style={[
                          styles.lessonRow,
                          active && styles.lessonRowActive,
                        ]}
                        onPress={() =>
                          Alert.alert(
                            lesson.title,
                            `Duration: ${lesson.duration}`,
                          )
                        }
                        accessibilityRole="button"
                        accessibilityLabel={lesson.title}>
                        <View
                          style={[
                            styles.lessonIndexWrap,
                            lesson.done
                              ? styles.lessonIndexWrapDone
                              : styles.lessonIndexWrapPending,
                          ]}>
                          <View
                            style={[
                              styles.lessonIndex,
                              lesson.done
                                ? styles.lessonIndexDone
                                : styles.lessonIndexPending,
                            ]}>
                            <Text style={styles.lessonIndexText}>
                              {lesson.id}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.miniPlay,
                              lesson.done
                                ? styles.miniPlayDone
                                : styles.miniPlayPending,
                            ]}>
                            <View style={styles.miniPlayTriangle} />
                          </View>
                        </View>

                        <View style={styles.lessonCopy}>
                          <Text style={styles.lessonTitle} numberOfLines={2}>
                            {lesson.title}
                          </Text>
                          <Text style={styles.lessonDuration}>
                            Duration : {lesson.duration}
                          </Text>
                        </View>

                        {lesson.done ? (
                          <Image
                            source={images.iconLessonDone}
                            style={styles.doneIcon}
                            resizeMode="contain"
                          />
                        ) : (
                          <View style={styles.pendingRing} />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </>
          ) : (
            <View style={styles.resourcesCard}>
              <Text style={styles.resourcesTitle}>
                Download Modules Documents
              </Text>

              <Pressable
                style={styles.filterField}
                onPress={() =>
                  Alert.alert('Filter', 'Filter lectures (demo)')
                }
                accessibilityRole="button"
                accessibilityLabel="Filter Lectures">
                <Text style={styles.filterText}>Filter Lectures</Text>
                <Text style={styles.filterChevron}>▾</Text>
              </Pressable>

              <Text style={styles.resourcesHint}>
                Download "Methods of Generating An Idea" Notes
              </Text>

              <View style={styles.resourceList}>
                {RESOURCES.map(item => (
                  <View key={item.id} style={styles.resourceRow}>
                    <View style={styles.resourceDocIcon}>
                      <BookIcon />
                    </View>
                    <View style={styles.resourceCopy}>
                      <Text style={styles.resourceLecture}>{item.lecture}</Text>
                      <Text style={styles.resourceFile} numberOfLines={1}>
                        {item.fileName}
                      </Text>
                    </View>
                    <Pressable
                      style={styles.downloadBtn}
                      onPress={() =>
                        Alert.alert('Download', `Downloading ${item.fileName}`)
                      }
                      accessibilityRole="button"
                      accessibilityLabel={`Download ${item.fileName}`}>
                      <Image
                        source={images.iconDownload}
                        style={styles.downloadIcon}
                        resizeMode="contain"
                      />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.spacing_11,
  },
  hero: {
    backgroundColor: colors.primary,
    paddingBottom: 0,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.spacing_4,
    marginBottom: spacing.spacing_5,
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
  heroHeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  moduleEyebrow: {
    ...fontStyles.headings.heading_5,
    color: colors.white,
    fontSize: 18,
    letterSpacing: 0.4,
  },
  moduleOf: {
    ...fontStyles.body.regular.body_4,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  heroTitle: {
    ...fontStyles.headings.heading_4,
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: spacing.spacing_8,
    marginBottom: spacing.spacing_8,
    fontSize: 17,
    lineHeight: 28,
    paddingVertical: spacing.spacing_6,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.spacing_11,
  },
  tab: {
    alignItems: 'center',
    paddingBottom: spacing.spacing_4,
    minWidth: 88,
  },
  tabLabel: {
    ...fontStyles.body.medium.body_2,
    color: 'rgba(255,255,255,0.55)',
  },
  tabLabelActive: {
    color: colors.white,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  body: {
    paddingTop: spacing.spacing_6,
    paddingHorizontal: spacing.spacing_6,
    gap: spacing.spacing_6,
  },
  chips: {
    flexDirection: 'row',
    gap: spacing.spacing_3,
    paddingRight: spacing.spacing_4,
  },
  chip: {
    borderRadius: radius.radius_5,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_4,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...fontStyles.body.medium.body_3,
    color: colors.text_secondary,
  },
  chipTextSelected: {
    color: colors.white,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.spacing_7,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_3,
    marginBottom: spacing.spacing_5,
  },
  progressIcon: {
    width: 18,
    height: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  bar: {
    width: 4,
    borderRadius: 1,
    backgroundColor: colors.input_accent,
  },
  bar1: {height: 8},
  bar2: {height: 12},
  bar3: {height: 16},
  cardTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.spacing_3,
  },
  progressStatText: {
    ...fontStyles.body.regular.body_3,
    color: colors.text_secondary,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E8EEF8',
    overflow: 'hidden',
    marginBottom: spacing.spacing_3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.input_accent,
    borderRadius: 3,
  },
  progressHint: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    marginBottom: spacing.spacing_6,
    fontSize: 10,
    
  },
  lockBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_4,
    backgroundColor: '#FEF3C6',
    borderRadius: 12,
    padding: spacing.spacing_5,
  },
  lockIcon: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  lockShackle: {
    width: 14,
    height: 10,
    borderWidth: 2.5,
    borderColor: '#E8A11A',
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  lockBody: {
    width: 20,
    height: 18,
    borderRadius: 3,
    backgroundColor: '#E8A11A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -1,
  },
  lockKeyhole: {
    width: 0,
    height: 0,
    borderRadius: 2,
    backgroundColor: '#FEF3C6',
  },
  lockCopy: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  lockTitle: {
    ...fontStyles.body.bold.body_3,
    color: '#8A5A00',
    marginBottom: 0,
  },
  lockSubtitle: {
    ...fontStyles.body.regular.body_4,
    color: '#8A5A00',
    lineHeight: 14,
  },
  videoThumb: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E8F5EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 14,
  },
  playBtn: {
    width: 50,
    height: 50,
    borderRadius: 29,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  playTriangle: {
    width: 0,
    height: 0,
    marginLeft: 4,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 16,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: colors.white,
  },
  durationPill: {
    position: 'absolute',
    left: spacing.spacing_5,
    bottom: spacing.spacing_5,
    backgroundColor: 'rgba(40,40,40,0.75)',
    borderRadius: 6,
    paddingHorizontal: spacing.spacing_4,
    paddingVertical: 4,
    zIndex: 1,
  },
  durationText: {
    ...fontStyles.body.medium.body_4,
    color: colors.white,
    fontSize: 11,
  },
  overviewCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: spacing.spacing_7,
    paddingVertical: spacing.spacing_7,
    gap: spacing.spacing_2,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 1,
  },
  videoTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 12,
  },
  videoSubtitle: {
    ...fontStyles.body.regular.body_3,
    color: colors.text_secondary,
    fontSize: 10,
  },
  contentCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.spacing_7,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 1,
  },
  contentTitle: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    marginBottom: spacing.spacing_6,
    fontSize: 14,
  },
  lessonList: {
    gap: spacing.spacing_2,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_5,
    paddingVertical: spacing.spacing_4,
    paddingHorizontal: spacing.spacing_3,
    borderRadius: 12,
  },
  lessonRowActive: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#BEDBFF',
  },
  lessonIndexWrap: {
    width: 50,
    height: 50,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonIndexWrapDone: {
    borderColor: '#22C55E',
  },
  lessonIndexWrapPending: {
    borderColor: colors.input_accent,
  },
  lessonIndex: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonIndexDone: {
    backgroundColor: '#22C55E',
  },
  lessonIndexPending: {
    backgroundColor: colors.input_accent,
  },
  lessonIndexText: {
    ...fontStyles.body.bold.body_2,
    color: colors.white,
    fontSize: 12,
  },
  miniPlay: {
    position: 'absolute',
    right: -1,
    bottom: -1,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniPlayDone: {
    backgroundColor: '#16A34A',
  },
  miniPlayPending: {
    backgroundColor: '#1D6FE8',
  },
  miniPlayTriangle: {
    width: 0,
    height: 0,
    marginLeft: 1,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 5,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: colors.white,
  },
  lessonCopy: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  lessonTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 12,
  },
  lessonDuration: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
  },
  doneIcon: {
    width: 22,
    height: 22,
  },
  pendingRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D0D7E2',
  },
  resourcesCard: {
    backgroundColor: colors.surface,
    borderRadius: 26,
    padding: spacing.spacing_8,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 1,
  },
  resourcesTitle: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    marginBottom: spacing.spacing_6,
    fontSize: 16,
  },
  filterField: {
    width: '40%',
    height: 42  ,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.radius_full,
    paddingHorizontal: spacing.spacing_7,
    paddingVertical: spacing.spacing_5,
    marginBottom: spacing.spacing_5,
    backgroundColor: colors.surface,
  },
  filterText: {
    ...fontStyles.body.regular.body_2,
    color: colors.text,
    fontSize: 12,
  },
  filterChevron: {
    color: colors.text_secondary,
    fontSize: 14,
    lineHeight: 16,
  },
  resourcesHint: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    marginBottom: spacing.spacing_7,
  },
  resourceList: {
    gap: spacing.spacing_10,
  },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_5,
  },
  resourceDocIcon: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: '#2B7FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookIcon: {
    width: 16,
    height: 15,
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 1,
  },
  bookSpine: {
    width: 3,
    borderRadius: 1,
    backgroundColor: colors.white,
  },
  bookPages: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 2,
    paddingHorizontal: 3,
    paddingVertical: 3,
    justifyContent: 'center',
    gap: 2,
  },
  bookLine: {
    height: 1.5,
    borderRadius: 1,
    backgroundColor: colors.primary,
  },
  bookLineShort: {
    height: 1.5,
    width: '60%',
    borderRadius: 1,
    backgroundColor: colors.primary,
  },
  resourceCopy: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  resourceLecture: {
    ...fontStyles.body.medium.body_4,
    color: colors.input_accent,
    fontSize: 12,
  },
  resourceFile: {
    ...fontStyles.body.regular.body_2,
    color: colors.text,
    fontSize: 12,
  },
  downloadBtn: {
    width: 34,
    height: 34,
    borderRadius: 20,
   // backgroundColor: '#E8F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: colors.border,
  },
  downloadIcon: {
    width: 18,
    height: 18,
    tintColor: colors.input_accent,
  },
});
