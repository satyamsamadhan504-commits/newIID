import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {images} from '../../../assets/images';
import {colors, fontStyles, radius, spacing} from '../../../module/style-guide';
import {noop} from '../../../utils';

const TABS = ['Upcoming Workshop', 'Past Workshop'] as const;

const PAST_WORKSHOPS = [
  {key: 'biscuit', title: 'Biscuit Making'},
  {key: 'noodles', title: 'Ready to Eat Noodles'},
  {key: 'jaggery', title: 'Jaggery Processing'},
  {key: 'confectionery', title: 'Confectionery'},
] as const;

const UPCOMING_WORKSHOPS = [
  {key: 'up-biscuit', title: 'Biscuit Making'},
  {key: 'up-noodles', title: 'Ready to Eat Noodles'},
] as const;

export function LearnFromIndustryExperts() {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>('Past Workshop');

  const workshops =
    selectedTab === 'Past Workshop' ? PAST_WORKSHOPS : UPCOMING_WORKSHOPS;

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Learn from Industry Experts</Text>
        <Pressable onPress={noop} accessibilityRole="button">
          <Text style={styles.more}>More  ›</Text>
        </Pressable>
      </View>

      <View style={styles.tabs}>
        {TABS.map(tab => {
          const selected = tab === selectedTab;
          return (
            <Pressable
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tab, selected && styles.tabSelected]}
              accessibilityRole="button"
              accessibilityState={{selected}}>
              <Text style={[styles.tabLabel, selected && styles.tabLabelSelected]}>
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.list}>
        {workshops.map(item => (
          <Pressable
            key={item.key}
            style={styles.row}
            onPress={noop}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}, Online, 16th July 2026`}>
            <View style={styles.thumbCol}>
              <View style={styles.thumbClip}>
                <Image
                  source={images.workshopBiscuit}
                  style={styles.thumb}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.chevron} pointerEvents="none">
                <Text style={styles.chevronMark}>›</Text>
              </View>
            </View>

            <View style={styles.info}>
              <Text style={styles.online}>Online</Text>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.metaRow}>
                <View style={styles.metaCol}>
                  <Text style={styles.metaLabel}>Date</Text>
                  <Text style={styles.metaValue}>16th July, 2026</Text>
                </View>
                <View style={styles.metaCol}>
                  <Text style={styles.metaLabel}>Timing</Text>
                  <Text style={styles.metaValue}>11:00 AM - 2:00PM</Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.spacing_8,
    paddingTop: spacing.spacing_4,
    paddingBottom: spacing.spacing_11,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  tabs: {
    flexDirection: 'row',
    gap: spacing.spacing_4,
    marginBottom: spacing.spacing_9,
  },
  tab: {
    backgroundColor: '#F1F5F9',
    borderRadius: radius.radius_3,
    paddingHorizontal: spacing.spacing_8,
    paddingVertical: spacing.spacing_5,
  },
  tabSelected: {
    backgroundColor: colors.text,
  },
  tabLabel: {
    ...fontStyles.body.medium.body_3,
    color: colors.text_secondary,
  },
  tabLabelSelected: {
    color: colors.white,
  },
  list: {
    gap: spacing.spacing_5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_4,
  },
  thumbCol: {
    width: 96,
    height: 96,
  },
  thumbClip: {
    width: 96,
    height: 96,
    borderRadius: radius.radius_4,
    overflow: 'hidden',
  },
  thumb: {
    width: 96,
    height: 100,
  },
  chevron: {
    position: 'absolute',
    right: 9,
    bottom: 12,
    width: 24,
    height: 24,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 1},
  },
  chevronMark: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 24,
    marginTop: -1,
  },
  info: {
    flex: 1,
    paddingTop: spacing.spacing_1,
  },
  online: {
    ...fontStyles.body.medium.body_4,
    color: colors.input_accent,
    fontSize: 10,
    lineHeight: 8,
    marginBottom: spacing.spacing_0,
  },
  itemTitle: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 12,
    lineHeight: 22,
    marginBottom: spacing.spacing_2,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.spacing_2,
  },
  metaCol: {
    flex: 1,
  },
  metaLabel: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    fontSize: 10,
    lineHeight: 14,
    marginBottom: spacing.spacing_1,
  },
  metaValue: {
    ...fontStyles.body.medium.body_4,
    color: colors.text,
    fontSize: 10,
    lineHeight: 16,
  },
});
