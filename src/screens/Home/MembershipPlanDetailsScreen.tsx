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
import {useNavigation} from '@react-navigation/native';
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

const SEGMENTS = ['Incubation', 'Startup', 'Franchise', 'Networking'] as const;

type Segment = (typeof SEGMENTS)[number];

type Plan = {
  key: string;
  name: string;
  duration: string;
  price: number;
  popular?: boolean;
};

const PLANS: Record<Segment, Plan[]> = {
  Incubation: [
    {key: 'executive', name: 'Executive', duration: 'Complete 1 Year', price: 5900},
    {
      key: 'associate',
      name: 'Associate',
      duration: 'Complete 1 Year',
      price: 11800,
      popular: true,
    },
    {key: 'consultant', name: 'Consultant', duration: 'Complete 1 Year', price: 18500},
  ],
  Startup: [
    {key: 'starter', name: 'Starter', duration: 'Complete 1 Year', price: 7500},
    {
      key: 'growth',
      name: 'Growth',
      duration: 'Complete 1 Year',
      price: 14900,
      popular: true,
    },
    {key: 'scale', name: 'Scale', duration: 'Complete 1 Year', price: 22900},
  ],
  Franchise: [
    {key: 'basic', name: 'Basic', duration: 'Complete 1 Year', price: 9900},
    {
      key: 'partner',
      name: 'Partner',
      duration: 'Complete 1 Year',
      price: 16900,
      popular: true,
    },
    {key: 'master', name: 'Master', duration: 'Complete 1 Year', price: 24900},
  ],
  Networking: [
    {key: 'member', name: 'Member', duration: 'Complete 1 Year', price: 4900},
    {
      key: 'circle',
      name: 'Circle',
      duration: 'Complete 1 Year',
      price: 9900,
      popular: true,
    },
    {key: 'council', name: 'Council', duration: 'Complete 1 Year', price: 15900},
  ],
};

const OVERVIEW = [
  'Best Option For Those Looking For Handholding Support For Setting Up Any Small Or Medium Scale Industry',
  'Online Access To 10 Industries in a Sector',
  'Prototype Project Report',
  'Industrial Documentary',
  'Supplier Connect & Expert Consultation',
  'Industry Related Government & Finance Polices Knowledge Sharing',
  'Bankable Customized Project Report(Project Cost upto 2 Cr) Or EDP Training',
  'GST & Udyam Aadhar Registration',
  'Free Access To Industry Webinar (Online)',
];

function formatInr(value: number) {
  return `₹${value.toLocaleString('en-IN')}`;
}

export function MembershipPlanDetailsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [segment, setSegment] = useState<Segment>('Incubation');
  const [selectedKey, setSelectedKey] = useState('associate');

  const plans = PLANS[segment];
  const selected = useMemo(
    () => plans.find(item => item.key === selectedKey) ?? plans[0],
    [plans, selectedKey],
  );

  function selectSegment(next: Segment) {
    setSegment(next);
    const popular = PLANS[next].find(item => item.popular) ?? PLANS[next][0];
    setSelectedKey(popular.key);
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 150 + insets.bottom}}
        bounces={false}>
        <View style={[ {paddingTop: insets.top}]}>
          <Image
            source={images.membershipHero}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroShade} />
          <Pressable
            style={[styles.closeBtn, {top: insets.top + spacing.spacing_2}]}
            onPress={() => navigation.goBack()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Close">
            <Text style={styles.closeText}>✕</Text>
          </Pressable>

          <View style={styles.heroTop}>
            <Text style={styles.kicker}>Membership Plan</Text>
            <Text style={styles.heroTitle}>Choose Your Growth Plan</Text>
            <Text style={styles.heroSubtitle}>
              Flexible plans designed for every entrepreneurial stage — from
              first idea to full-scale industry.
            </Text>
          </View>

          <View style={styles.heroBottom}>
            <View style={styles.segment}>
              {SEGMENTS.map(item => {
                const active = item === segment;
                return (
                  <Pressable
                    key={item}
                    onPress={() => selectSegment(item)}
                    style={[styles.segmentItem, active && styles.segmentItemActive]}
                    accessibilityRole="button"
                    accessibilityState={{selected: active}}>
                    <Text
                      style={[
                        styles.segmentLabel,
                        active && styles.segmentLabelActive,
                      ]}
                      numberOfLines={1}>
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.plans}>
          {plans.map(plan => {
            const active = plan.key === selected.key;
            return (
              <Pressable
                key={plan.key}
                onPress={() => setSelectedKey(plan.key)}
                style={[styles.planCard, active && styles.planCardActive]}
                accessibilityRole="button"
                accessibilityState={{selected: active}}>
                <View
                  style={[
                    styles.planHeader,
                    active ? styles.planHeaderActive : styles.planHeaderIdle,
                  ]}>
                  <Text
                    style={[
                      styles.planName,
                      active && styles.planNameActive,
                    ]}>
                    {plan.name}
                  </Text>
                </View>
                <View style={styles.planBody}>
                  <Text style={styles.planDuration}>{plan.duration}</Text>
                  <Text style={styles.planPrice}>{formatInr(plan.price)}</Text>
                  <Text style={styles.planGst}>GST Inclusive</Text>
                </View>
                {plan.popular ? (
                  <View style={styles.popularWrap}>
                    <View style={styles.popular}>
                      <Text style={styles.popularText}>Most Popular</Text>
                    </View>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.overview}>
          <Text style={styles.overviewTitle}>Plan Overview</Text>
          {OVERVIEW.map(item => (
            <View key={item} style={styles.benefitRow}>
              <Image
                source={images.iconPlanCheck}
                style={styles.benefitIcon}
                resizeMode="contain"
              />
              <Text style={styles.benefitText}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, {paddingBottom: Math.max(insets.bottom, spacing.spacing_6)}]}>
        <Text style={styles.customLine}>
          Need a custom plan?{' '}
          <Text
            style={styles.readMore}
            onPress={() => Alert.alert('Custom plan', 'Our team will help you pick a plan.')}>
            Read More
          </Text>
        </Text>
        <Pressable
          style={styles.buyBtn}
          onPress={() =>
            Alert.alert(
              'Buy Membership',
              `${selected.name} · ${formatInr(selected.price)}`,
            )
          }
          accessibilityRole="button">
          <Text style={styles.buyText}>
            Buy Membership  -  {formatInr(selected.price)} Total
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  hero: {
   // minHeight: 292,
    //backgroundColor: '#1A1A1A',
    justifyContent: 'space-between',
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    height: 262,
    width: '100%',
  },
  heroShade: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#0000008C',
    height: 262,
  },
  heroTop: {
    paddingHorizontal: spacing.spacing_8,
    paddingTop: spacing.spacing_8,
    alignItems: 'center',
  },
  heroBottom: {
    paddingHorizontal: spacing.spacing_8,
    paddingBottom: spacing.spacing_8,
  },
  closeBtn: {
    position: 'absolute',
    right: spacing.spacing_4,
    zIndex: 2,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  kicker: {
    ...fontStyles.body.regular.body_4,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: spacing.spacing_1,
    marginTop: spacing.spacing_10,
    fontSize: 13,
  },
  heroTitle: {
    ...fontStyles.headings.heading_4,
    color: colors.white,
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 30,
    marginBottom: spacing.spacing_3,
  },
  heroSubtitle: {
    ...fontStyles.body.regular.body_4,
    color: 'rgba(255,255,255,0.88)',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: spacing.spacing_4,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radius.radius_full,
    padding: 3,
    marginTop: spacing.spacing_8,
    marginBottom: spacing.spacing_12,
  },
  segmentItem: {
    flex: 1,
    borderRadius: radius.radius_full,
    paddingVertical: spacing.spacing_4,
    alignItems: 'center',
  },
  segmentItemActive: {
    backgroundColor: '#2152CB',
  },
  segmentLabel: {
    ...fontStyles.body.medium.body_4,
    color: colors.text,
    fontSize: 12,
  },
  segmentLabelActive: {
    color: colors.white,
  },
  plans: {
    paddingHorizontal: spacing.spacing_8,
    paddingTop: spacing.spacing_2,
    paddingBottom: spacing.spacing_8,
    gap: spacing.spacing_5,
  },
  planCard: {
    width: 148,
    backgroundColor: colors.white,
    borderRadius: radius.radius_4,
    borderWidth: 1.5,
    borderColor: '#E6EAF0',
    overflow: 'visible',
  },
  planCardActive: {
    borderColor: '#2152CB',
  },
  planHeader: {
    borderTopLeftRadius: radius.radius_4 - 1,
    borderTopRightRadius: radius.radius_4 - 1,
    paddingVertical: spacing.spacing_5,
    paddingHorizontal: spacing.spacing_4,
    alignItems: 'center',
  },
  planHeaderIdle: {
    backgroundColor: '#EDF1F6',
  },
  planHeaderActive: {
    backgroundColor: '#2152CB',
  },
  planBody: {
    alignItems: 'center',
    paddingTop: spacing.spacing_5,
    paddingBottom: spacing.spacing_8,
    paddingHorizontal: spacing.spacing_4,
  },
  planName: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
  },
  planNameActive: {
    color: colors.white,
  },
  planDuration: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    marginBottom: spacing.spacing_3,
  },
  planPrice: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 20,
    lineHeight: 26,
  },
  planGst: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    marginTop: 2,
    fontSize: 11,
  },
  popularWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -12,
    alignItems: 'center',
  },
  popular: {
    backgroundColor: '#22C55E',
    borderRadius: radius.radius_full,
    paddingHorizontal: spacing.spacing_4,
    paddingVertical: 3,
  },
  popularText: {
    ...fontStyles.body.medium.body_4,
    color: colors.white,
    fontSize: 10,
  },
  overview: {
    paddingHorizontal: spacing.spacing_8,
    paddingTop: spacing.spacing_6,
    gap: spacing.spacing_6,
  },
  overviewTitle: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 16,
    marginBottom: spacing.spacing_2,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_4,
  },
  benefitIcon: {
    width: 20,
    height: 20,
  },
  benefitText: {
    ...fontStyles.body.regular.body_3,
    color: '#71717B',
    flex: 1,
    lineHeight: 20,
    fontSize: 12,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.spacing_8,
    paddingTop: spacing.spacing_5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    gap: spacing.spacing_5,
  },
  customLine: {
    ...fontStyles.body.regular.body_3,
    color: colors.text_secondary,
    textAlign: 'center',
  },
  readMore: {
    color: colors.primary,
    fontWeight: '600',
  },
  buyBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.radius_full,
    paddingVertical: spacing.spacing_6,
    alignItems: 'center',
  },
  buyText: {
    ...fontStyles.body.bold.body_2,
    color: colors.white,
  },
});
