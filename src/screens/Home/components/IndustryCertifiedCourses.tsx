import React, {useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {images} from '../../../assets/images';
import {openCoursesScreen} from '../../../navigation/openSolutionScreen';
import type {MainTabParamList} from '../../../navigation/types';
import {colors, fontStyles, radius, spacing} from '../../../module/style-guide';

const CARD_W = 120;
const THUMB_H = 120;

const COURSES = [
  {
    key: 'ac',
    title: 'AC, Refrigerator & Appliance Repair...',
    duration: '5h 12m',
    image: images.courseAcRepair,
  },
  {
    key: 'agarbatti',
    title: 'Agarbatti & Dhoop Manufacturing Unit',
    duration: '1h 8m',
    image: images.courseAcRepair,
  },
  {
    key: 'auto',
    title: 'Automotive Service Technician...',
    duration: '1h 26m',
    image: images.courseAcRepair,
  },
  {
    key: 'auto-2',
    title: 'Automotive Service Technician...',
    duration: '2h 4m',
    image: images.courseAcRepair,
  },
] as const;

type Course = (typeof COURSES)[number];

function ClockIcon() {
  return (
    <View style={styles.clock}>
      <View style={styles.clockHour} />
      <View style={styles.clockMinute} />
    </View>
  );
}

export function IndustryCertifiedCourses() {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabParamList, 'HomeTab'>>();
  const [playing, setPlaying] = useState<Course | null>(null);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Industry Certified Courses</Text>
        <Pressable
          onPress={() => openCoursesScreen(navigation)}
          accessibilityRole="button">
          <Text style={styles.more}>More  ›</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cards}>
        {COURSES.map(course => (
          <Pressable
            key={course.key}
            style={styles.card}
            onPress={() => setPlaying(course)}
            accessibilityRole="button"
            accessibilityLabel={`${course.title}, ${course.duration}`}>
            <View style={styles.thumbWrap}>
              <Image
                source={course.image}
                style={styles.thumb}
                resizeMode="cover"
              />
              <View style={styles.playBtn} pointerEvents="none">
                <View style={styles.playTriangle} />
              </View>
            </View>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {course.title}
            </Text>
            <View style={styles.meta}>
              <ClockIcon />
              <Text style={styles.duration}>{course.duration}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <Modal
        visible={playing !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPlaying(null)}>
        <View style={styles.modalRoot}>
          <Pressable style={styles.modalBackdrop} onPress={() => setPlaying(null)} />
          <View style={styles.player}>
            {playing ? (
              <>
                <View style={styles.playerThumbWrap}>
                  <Image
                    source={playing.image}
                    style={styles.playerThumb}
                    resizeMode="cover"
                  />
                  <View style={styles.playerPlay}>
                    <View style={styles.playTriangle} />
                  </View>
                </View>
                <Text style={styles.playerTitle}>{playing.title}</Text>
                <Text style={styles.playerHint}>Demo playback</Text>
                <Pressable
                  style={styles.closeBtn}
                  onPress={() => setPlaying(null)}
                  accessibilityRole="button">
                  <Text style={styles.closeText}>Close</Text>
                </Pressable>
              </>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.surface,
    paddingTop: spacing.spacing_4,
    paddingBottom: spacing.spacing_11,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.spacing_8,
    marginBottom: spacing.spacing_8,
  },
  title: {
    ...fontStyles.headings.heading_4,
    color: colors.text,
    flex: 1,
    paddingRight: spacing.spacing_4,
  },
  more: {
    ...fontStyles.body.medium.body_2,
    color: colors.primary,
  },
  cards: {
    gap: spacing.spacing_6,
    paddingHorizontal: spacing.spacing_8,
    paddingRight: spacing.spacing_10,
  },
  card: {
    width: CARD_W,
  },
  thumbWrap: {
    width: CARD_W,
    height: THUMB_H,
    borderRadius: radius.radius_4,
    overflow: 'hidden',
    marginBottom: spacing.spacing_5,
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  playBtn: {
    position: 'absolute',
    right: spacing.spacing_4,
    bottom: spacing.spacing_4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
  },
  playTriangle: {
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: colors.primary,
  },
  cardTitle: {
    ...fontStyles.body.medium.body_4,
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    minHeight: 36,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_3,
    marginTop: spacing.spacing_3,
  },
  clock: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.4,
    borderColor: colors.text_secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockHour: {
    position: 'absolute',
    width: 1.4,
    height: 3,
    backgroundColor: colors.text_secondary,
    top: 2.2,
    borderRadius: 1,
  },
  clockMinute: {
    position: 'absolute',
    width: 3.5,
    height: 1.4,
    backgroundColor: colors.text_secondary,
    left: 5.5,
    borderRadius: 1,
  },
  duration: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    fontSize: 12,
    lineHeight: 16,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.spacing_10,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.overlay,
  },
  player: {
    backgroundColor: colors.surface,
    borderRadius: radius.radius_4,
    padding: spacing.spacing_8,
  },
  playerThumbWrap: {
    borderRadius: radius.radius_4,
    overflow: 'hidden',
    marginBottom: spacing.spacing_6,
  },
  playerThumb: {
    width: '100%',
    height: 180,
  },
  playerPlay: {
    position: 'absolute',
    alignSelf: 'center',
    top: 76,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 3,
  },
  playerTitle: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    marginBottom: spacing.spacing_2,
  },
  playerHint: {
    ...fontStyles.body.regular.body_3,
    color: colors.text_secondary,
    marginBottom: spacing.spacing_8,
  },
  closeBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: radius.radius_full,
    paddingHorizontal: spacing.spacing_8,
    paddingVertical: spacing.spacing_4,
  },
  closeText: {
    ...fontStyles.body.bold.body_3,
    color: colors.white,
    lineHeight: 16,
  },
});
