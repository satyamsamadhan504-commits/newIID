import React, {useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import {images} from '../../../assets/images';
import {colors, fontStyles, radius, spacing} from '../../../module/style-guide';
import {noop} from '../../../utils';

const CARD_W = 156;
const CARD_H = 204;

const STORIES = [
  {
    key: 'peeyoosh',
    name: 'Peeyoosh Agarwal',
    role: 'Founder & CEO',
    image: images.storyPeeyoosh,
  },
  {
    key: 'tushar',
    name: 'Tushar Kansal',
    role: 'Founder & CEO',
    image: images.storyTushar,
  },
  {
    key: 'hemant',
    name: 'Hemant',
    role: 'Founder & CEO',
    image: images.storyHemant,
  },
] as const;

type Story = (typeof STORIES)[number];

export function EntrepreneurSuccessStories() {
  const [playing, setPlaying] = useState<Story | null>(null);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Entrepreneur Success Stories</Text>
        <Pressable onPress={noop} accessibilityRole="button">
          <Text style={styles.more}>More  ›</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cards}>
        {STORIES.map(story => (
          <Pressable
            key={story.key}
            style={styles.card}
            onPress={() => setPlaying(story)}
            accessibilityRole="button"
            accessibilityLabel={`${story.name}, ${story.role}`}>
            <View style={styles.thumbWrap}>
              <Image
                source={story.image as ImageSourcePropType}
                style={styles.thumb}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.name}>{story.name}</Text>
            <Text style={styles.role}>{story.role}</Text>
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
                <Text style={styles.playerTitle}>{playing.name}</Text>
                <Text style={styles.playerHint}>Demo playback · {playing.role}</Text>
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
    height: CARD_H,
    borderRadius: radius.radius_4,
    overflow: 'hidden',
    marginBottom: spacing.spacing_5,
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
  name: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 15,
    lineHeight: 20,
  },
  role: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    fontSize: 12,
    lineHeight: 16,
    marginTop: spacing.spacing_1,
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
    height: 220,
  },
  playerPlay: {
    position: 'absolute',
    alignSelf: 'center',
    top: 88,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 3,
  },
  playTriangle: {
    width: 0,
    height: 0,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderLeftWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: colors.white,
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
