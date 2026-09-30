import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import type {CoursesStackParamList} from '../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../module/style-guide';

type Props = NativeStackScreenProps<
  CoursesStackParamList,
  'IndustrialCourseDetails'
>;

const HERO: Record<'snack' | 'bakery' | 'dough', ImageSourcePropType> = {
  snack: images.courseSnack,
  bakery: images.courseBakery,
  dough: images.courseDough,
};

const MODULE_COPY =
  'The Bakery Technology Course is designed to equip aspiring bakers and industry professionals with the essential skills and knowledge required to excel in the bakery sector.';

const LESSONS: ReadonlyArray<{
  id: number;
  title: string;
  duration: string;
  done: boolean;
  pdf?: boolean;
}> = [
  {id: 1, title: 'Bakery Why Baking', duration: '7 Min', done: true},
  {id: 2, title: 'Bakery Ingredients', duration: '12 Min', done: true},
  {id: 3, title: 'Mixing Methods', duration: '9 Min', done: false},
  {id: 4, title: 'Proofing Basics', duration: '8 Min', done: false},
  {id: 5, title: 'Oven Settings', duration: '11 Min', done: false},
  {id: 6, title: 'Bakery Equipment and Process', duration: '6 Min', done: false, pdf: true},
  {id: 7, title: 'Packaging & Sales', duration: '10 Min', done: false},
];

export function IndustrialCourseDetailsScreen({navigation, route}: Props) {
  const {title, category, price, imageKey} = route.params;
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);
  const [moduleOpen, setModuleOpen] = useState(true);
  const [skipPulse, setSkipPulse] = useState<'back' | 'forward' | null>(null);
  const backSpin = useRef(new Animated.Value(0)).current;
  const forwardSpin = useRef(new Animated.Value(0)).current;
  const overview = MODULE_COPY;
  const preview = overview.slice(0, 110).trimEnd() + '...';

  useEffect(() => {
    if (!skipPulse) {
      return;
    }
    const value = skipPulse === 'back' ? backSpin : forwardSpin;
    value.setValue(0);
    const anim = Animated.timing(value, {
      toValue: 1,
      duration: 650,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    anim.start(({finished}) => {
      if (finished) {
        setSkipPulse(null);
      }
    });
    return () => anim.stop();
  }, [skipPulse, backSpin, forwardSpin]);

  const backRotate = backSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });
  const forwardRotate = forwardSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
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
              <Text style={styles.heroSubtitle}>{category}</Text>
            </View>
            <View style={styles.backBtn} />
          </View>
        </View>

        <View style={styles.playerFrame}>
          <View style={styles.playerWrap}>
            <Image
              source={HERO[imageKey]}
              style={styles.playerImage}
              resizeMode="cover"
            />
            <View style={styles.playerOverlay}>
              <View style={styles.playerControls}>
                <Pressable
                  onPress={() => setSkipPulse('back')}
                  style={styles.skipHit}
                  accessibilityLabel="Rewind 10 seconds">
                  <Animated.Image
                    source={images.iconSkipBack}
                    style={[
                      styles.skipIcon,
                      skipPulse === 'back' && {
                        transform: [{rotate: backRotate}],
                      },
                    ]}
                    resizeMode="contain"
                  />
                </Pressable>
                <Pressable style={styles.pauseBtn} accessibilityLabel="Pause">
                  <View style={styles.pauseBar} />
                  <View style={styles.pauseBar} />
                </Pressable>
                <Pressable
                  onPress={() => setSkipPulse('forward')}
                  style={styles.skipHit}
                  accessibilityLabel="Forward 10 seconds">
                  <Animated.Image
                    source={images.iconSkipForward}
                    style={[
                      styles.skipIcon,
                      skipPulse === 'forward' && {
                        transform: [{rotate: forwardRotate}],
                      },
                    ]}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
              <View style={styles.progressRow}>
                <Text style={styles.timeText}>00:05</Text>
                <View style={styles.progressTrack}>
                  <View style={styles.progressFill} />
                  <View style={styles.progressKnob} />
                </View>
                <Text style={styles.timeText}>-04:21</Text>
                <Text style={styles.speedText}>1x</Text>
                <Pressable accessibilityLabel="Fullscreen">
                  <Image
                    source={images.iconFullscreen}
                    style={styles.fullscreenIcon}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.moduleTitle}>
            MODULE I : Bakery Baking is a Million Dollar Marketing
          </Text>
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
          <Text style={styles.sectionTitle}>Curriculum</Text>
          <Text style={styles.metaLine}>
            • 2 Modules • 21 Lectures • 9 Videos • 12 Document
          </Text>

          <Pressable
            style={styles.moduleHeader}
            onPress={() => setModuleOpen(value => !value)}
            accessibilityRole="button">
            <Text style={styles.moduleHeaderTitle}>
              Module 1 - Bakery Technology Course
            </Text>
            <Text style={styles.moduleChevron}>{moduleOpen ? '⌃' : '⌄'}</Text>
          </Pressable>

          {moduleOpen ? (
            <>
              <View style={styles.badgeRow}>
                <View style={styles.lessonsBadge}>
                  <Text style={styles.lessonsBadgeText}>2/7 Lessons</Text>
                </View>
                <View style={styles.progressBadge}>
                  <Text style={styles.progressBadgeText}>4% Completed</Text>
                </View>
              </View>

              {LESSONS.map(lesson => (
                <View key={lesson.id} style={styles.lessonRow}>
                  <View style={styles.lessonIndex}>
                    <Text style={styles.lessonIndexText}>{lesson.id}</Text>
                  </View>
                  <View style={styles.lessonCopy}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <View style={styles.lessonMeta}>
                      <Text style={styles.lessonDuration}>
                        • Duration: {lesson.duration}
                      </Text>
                      {lesson.pdf ? (
                        <Text style={styles.pdfTag}>• PDF</Text>
                      ) : null}
                    </View>
                  </View>
                  {lesson.pdf ? (
                    <Pressable
                      style={styles.downloadBtn}
                      onPress={() =>
                        Alert.alert('Download', `${lesson.title} (demo).`)
                      }
                      accessibilityLabel="Download PDF">
                      <Image
                        source={images.iconDownload}
                        style={styles.downloadIcon}
                        resizeMode="contain"
                      />
                    </Pressable>
                  ) : null}
                  {lesson.done ? (
                    <Image
                      source={images.iconLessonDone}
                      style={styles.doneIcon}
                      resizeMode="contain"
                    />
                  ) : (
                    <View style={styles.statusDot} />
                  )}
                </View>
              ))}
            </>
          ) : null}

          <Pressable
            style={[styles.moduleHeader, styles.moduleHeaderClosed]}
            onPress={noopSafe}
            accessibilityRole="button">
            <Text style={styles.moduleHeaderTitle}>
              Module 2 - Study Material
            </Text>
            <Text style={styles.moduleChevron}>⌄</Text>
          </Pressable>
        </View>

        <View style={[styles.card, styles.cardFollow]}>
          <Text style={styles.sectionTitle}>Prerequisites</Text>
          <View style={styles.prereqRow}>
            <Image
              source={images.iconVerified}
              style={styles.verifiedIcon}
              resizeMode="contain"
            />
            <Text style={styles.prereqText}>
              No specific requirement is needed
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.feeLabel}>Course Fee</Text>
          <Text style={styles.feeAmount}>{price}</Text>
        </View>
        <View style={styles.footerActions}>
          <Pressable
            style={styles.buyBtn}
            onPress={() => Alert.alert('Buy Now', `${title} (demo).`)}
            accessibilityRole="button">
            <Image
              source={images.iconBuy}
              style={styles.buyIcon}
              resizeMode="contain"
            />
            <Text style={styles.buyText}>Buy Now</Text>
          </Pressable>
          <Pressable
            style={styles.cartBtn}
            onPress={() => Alert.alert('Add to Cart', `${title} (demo).`)}
            accessibilityRole="button">
            <Text style={styles.cartText}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function noopSafe() {}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  hero: {
    backgroundColor: '#1E4ED8',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: spacing.spacing_6,
    paddingBottom: 56,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
    ...fontStyles.headings.heading_4,
    color: colors.white,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    marginLeft: spacing.spacing_2,
  },
  heroSubtitle: {
    ...fontStyles.body.regular.body_4,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
    textAlign: 'center',
  },
  playerFrame: {
    marginHorizontal: spacing.spacing_6,
    marginTop: -40,
    padding: 0.7,
    borderRadius: 18,
    backgroundColor: colors.white,
    elevation: 0,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  playerWrap: {
    height: 178,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  playerImage: {
    width: '100%',
    height: '100%',
  },
  playerOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.28)',
    justifyContent: 'flex-end',
    padding: spacing.spacing_5,
  },
  playerControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.spacing_10,
  },
  skipHit: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipIcon: {
    width: 36,
    height: 36,
    tintColor: colors.white,
  },
  pauseBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2.5,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  pauseBar: {
    width: 5,
    height: 18,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_3,
  },
  timeText: {
    color: colors.white,
    fontSize: 10,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.35)',
    justifyContent: 'center',
  },
  progressFill: {
    width: '18%',
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  progressKnob: {
    position: 'absolute',
    left: '16%',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  speedText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '600',
  },
  fullscreenIcon: {
    width: 16,
    height: 16,
    tintColor: colors.white,
  },  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    marginHorizontal: spacing.spacing_6,
    marginTop: spacing.spacing_6,
    padding: spacing.spacing_8,
    gap: spacing.spacing_4,
  },
  cardFollow: {
    marginTop: spacing.spacing_6,
  },
  moduleTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
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
  sectionTitle: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 18,
    lineHeight: 24,
  },
  metaLine: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    marginBottom: spacing.spacing_2,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.spacing_3,
  },
  moduleHeaderClosed: {
    marginTop: spacing.spacing_5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.spacing_6,
  },
  moduleHeaderTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    flex: 1,
    paddingRight: spacing.spacing_4,
  },
  moduleChevron: {
    color: colors.text_secondary,
    fontSize: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.spacing_3,
    marginTop: spacing.spacing_3,
    marginBottom: spacing.spacing_2,
  },
  lessonsBadge: {
    backgroundColor: colors.input_accent,
    borderRadius: radius.radius_2,
    paddingHorizontal: spacing.spacing_5,
    paddingVertical: 4,
  },
  lessonsBadgeText: {
    ...fontStyles.body.medium.body_4,
    color: colors.white,
    fontSize: 11,
  },
  progressBadge: {
    backgroundColor: '#FACC15',
    borderRadius: radius.radius_2,
    paddingHorizontal: spacing.spacing_5,
    paddingVertical: 4,
  },
  progressBadgeText: {
    ...fontStyles.body.medium.body_4,
    color: colors.text,
    fontSize: 11,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_4,
    paddingVertical: spacing.spacing_4,
  },
  lessonIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EEF1F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonIndexText: {
    ...fontStyles.body.medium.body_4,
    color: colors.text_secondary,
  },
  lessonCopy: {
    flex: 1,
    minWidth: 0,
  },
  lessonTitle: {
    ...fontStyles.body.bold.body_3,
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_3,
    marginTop: 2,
  },
  lessonDuration: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
  },
  pdfTag: {
    ...fontStyles.body.medium.body_4,
    color: colors.text_secondary,
    fontSize: 10,
  },
  downloadBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E8F1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadIcon: {
    width: 14,
    height: 14,
    tintColor: colors.input_accent,
  },
  doneIcon: {
    width: 20,
    height: 20,
  },
  statusDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#D0D5DD',
  },
  prereqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_4,
  },
  verifiedIcon: {
    width: 22,
    height: 22,
  },
  prereqText: {
    ...fontStyles.body.regular.body_3,
    color: colors.text_secondary,
    flex: 1,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.spacing_6,
    paddingTop: spacing.spacing_5,
    paddingBottom: spacing.spacing_7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.spacing_4,
  },
  feeLabel: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
  },
  feeAmount: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 20,
    lineHeight: 26,
  },
  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_3,
  },
  buyBtn: {
    backgroundColor: colors.input_accent,
    borderRadius: radius.radius_5,
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_3,
  },
  buyIcon: {
    width: 14,
    height: 14,
    tintColor: colors.white,
  },
  buyText: {
    ...fontStyles.body.bold.body_3,
    color: colors.white,
    fontSize: 12,
  },
  cartBtn: {
    borderWidth: 1.5,
    borderColor: colors.input_accent,
    borderRadius: radius.radius_5,
    paddingHorizontal: spacing.spacing_5,
    paddingVertical: spacing.spacing_2,
  },
  cartText: {
    ...fontStyles.body.bold.body_3,
    color: colors.input_accent,
    fontSize: 12,
  },
});
