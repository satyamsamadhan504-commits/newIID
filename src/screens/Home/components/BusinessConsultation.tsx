import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, fontStyles, radius, spacing} from '../../../module/style-guide';
import {noop} from '../../../utils';

const CARD_BG = '#EFF6FF';
const JOURNEY_BG = '#FEF3C6';
const BADGE_BG = '#FACC15';

const CARD_W = 140;
const ART_H = 136;
const ART_CORNER = 24;
const FOOT_W = 64;
const FOOT_H = 40;
const SHELF_H = ART_H - FOOT_H;
const SCOOP_R = 24;
const FILLET_R = 16;
const SHOULDER_R = 18;

const TABS = ['Professional Segments', 'Industrial Segments'] as const;

const SEGMENTS = [
  {key: 'food', label: 'Food Processing', consultants: 28},
  {key: 'agri', label: 'Agri & Agri Food\nBusiness', consultants: 22},
  {key: 'cement', label: 'Cement & Allied\nProduct', consultants: 9},
] as const;

export function BusinessConsultation() {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>('Industrial Segments');

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Business Consultation</Text>
        <Pressable onPress={noop} accessibilityRole="button">
          <Text style={styles.more}>More  ›</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}>
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
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cards}>
        {SEGMENTS.map(item => (
          <Pressable
            key={item.key}
            style={styles.card}
            onPress={noop}
            accessibilityRole="button"
            accessibilityLabel={`${item.label.replace('\n', ' ')}, ${item.consultants} Consultant`}>
            <View style={styles.art}>
              <View pointerEvents="none" style={styles.artFoot} />
              <View pointerEvents="none" style={styles.artShelf} />
              <View pointerEvents="none" style={styles.artFillet}>
                <View style={styles.artFilletCut} />
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {String(item.consultants).padStart(2, '0')} Consultant
                </Text>
              </View>
            </View>
            <Text style={styles.cardLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.journeyTitle}>Candidate Journey</Text>
      <View style={styles.journeyPlaceholder} />
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
  },
  more: {
    ...fontStyles.body.medium.body_2,
    color: colors.primary,
  },
  tabs: {
    gap: spacing.spacing_4,
    paddingBottom: spacing.spacing_9,
  },
  tab: {
    backgroundColor: '#F1F2F4',
    borderRadius: radius.radius_3 ,
    paddingHorizontal: spacing.spacing_8,
    paddingVertical: spacing.spacing_5,
  },
  tabSelected: {
    backgroundColor: colors.text,
  },
  tabLabel: {
    ...fontStyles.body.medium.body_4,
    color: colors.text_secondary,
  },
  tabLabelSelected: {
    color: colors.white,
  },
  cards: {
    gap: spacing.spacing_6,
    paddingBottom: spacing.spacing_10,
    paddingRight: spacing.spacing_8,
  },
  card: {
    width: CARD_W,
  },
  art: {
    height: ART_H,
    marginBottom: spacing.spacing_5,
  },
  artShelf: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SHELF_H,
    backgroundColor: CARD_BG,
    borderTopLeftRadius: ART_CORNER,
    borderTopRightRadius: ART_CORNER,
    borderBottomLeftRadius: SHOULDER_R,
  },
  artFoot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: FOOT_W - FILLET_R + 1,
    height: FOOT_H + 1,
    backgroundColor: CARD_BG,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 40,
  },
  artFillet: {
    position: 'absolute',
    left: CARD_W - FOOT_W,
    top: SHELF_H,
    width: FILLET_R,
    height: FILLET_R,
    overflow: 'hidden',
    backgroundColor: CARD_BG,
  },
  artFilletCut: {
    position: 'absolute',
    left: -FILLET_R,
    top: 0,
    width: FILLET_R * 2,
    height: FILLET_R * 2,
    borderRadius: 60,
    backgroundColor: colors.surface,
  },
  badge: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 2,
    backgroundColor: BADGE_BG,
    borderRadius: radius.radius_full,
    paddingHorizontal: spacing.spacing_5,
    paddingVertical: spacing.spacing_4,
  },
  badgeText: {
    ...fontStyles.body.bold.body_3,
    color: colors.text,
    fontSize: 11,
    lineHeight: 14,
  },
  cardLabel: {
    ...fontStyles.body.medium.body_4,
    color: colors.text,
    fontSize: 12,
    lineHeight: 16,
  },
  journeyTitle: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    marginBottom: spacing.spacing_6,
  },
  journeyPlaceholder: {
    height: 96,
    backgroundColor: JOURNEY_BG,
    borderRadius: radius.radius_4,
  },
});
