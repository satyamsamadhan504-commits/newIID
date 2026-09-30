import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {images} from '../../../assets/images';
import {openServiceCategory} from '../../../navigation/openSolutionScreen';
import type {MainTabParamList} from '../../../navigation/types';
import {colors, fontStyles, radius, spacing} from '../../../module/style-guide';
import {MembershipPlan} from './MembershipPlan';

const TABS = ['Manufacturing', 'Franchise', 'Service Sector', 'Business'] as const;

const INDUSTRIES = [
  {key: 'automobile', label: 'Automobile\nIndustry', icon: images.industryAutomobile, count: 11},
  {key: 'chemical', label: 'Chemical\nPolymer Industry', icon: images.industryChemical, count: 11},
  {key: 'cold-storage', label: 'Cold Storage\nSolution', icon: images.industryColdStorage, count: 11},
  {key: 'packaging', label: 'Printing &\nPackaging', icon: images.industryPackaging, count: 11},
  {key: 'food', label: 'Food Processing', icon: images.industryFood, count: 11},
  {key: 'textile', label: 'Textile & Apparel', icon: images.industryTextile, count: 11},
  {key: 'medical', label: 'Surgical &\nMedical', icon: images.industryMedical, count: 11},
  {key: 'metal', label: 'Metal & Alloy', icon: images.industryMetal, count: 11},
] as const;

export function BusinessSolution() {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabParamList, 'HomeTab'>>();
  const [selectedTab, setSelectedTab] = useState<(typeof TABS)[number]>('Franchise');

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Business Solution</Text>
        <Pressable
          onPress={() => openServiceCategory(navigation, 'business-solution')}
          accessibilityRole="button">
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

      <View style={styles.grid}>
        {INDUSTRIES.map(item => (
          <Pressable
            key={item.key}
            style={styles.item}
            onPress={() => openServiceCategory(navigation, 'business-solution')}
            accessibilityRole="button"
              accessibilityLabel={`${item.label.replace('\n', ' ')}, ${item.count}`}>
            <View style={styles.iconStack}>
              <View style={styles.iconWrap}>
                <Image source={item.icon} style={styles.icon} resizeMode="contain" />
              </View>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{item.count}</Text>
              </View>
            </View>
            <Text style={styles.itemLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <MembershipPlan />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.spacing_8,
    paddingTop: spacing.spacing_10,
    paddingBottom: spacing.spacing_8,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '25%',
    alignItems: 'center',
    marginBottom: spacing.spacing_9,
    paddingHorizontal: spacing.spacing_2,
  },
  iconStack: {
    width: 64,
    height: 64,
    marginBottom: spacing.spacing_4,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: radius.radius_full,
    backgroundColor: '#F4F6F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 36,
    height: 36,
  },
  countBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    minWidth: 22,
    height: 22,
    borderRadius: radius.radius_full,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  countText: {
    ...fontStyles.body.bold.body_3,
    color: colors.white,
    fontSize: 10,
    lineHeight: 12,
  },
  itemLabel: {
    ...fontStyles.body.medium.body_4,
    color: colors.text,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 14,
  },
});
