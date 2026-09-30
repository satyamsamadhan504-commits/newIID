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
  type ImageSourcePropType,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import type {RootStackParamList} from '../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../module/style-guide';

type Props = NativeStackScreenProps<RootStackParamList, 'WorkshopDetails'>;

const OVERVIEW =
  'Join us for an insightful Webinar on Solar Water Heater Assembly, designed for MSME owners, technicians, and entrepreneurs looking to expand into renewable energy solutions. This live session covers practical assembly techniques, component selection, installation best practices, and common troubleshooting tips.';

const KEY_POINTS =
  'We will discuss system components, step-by-step assembly workflow, safety checks, efficiency optimization, and how to position solar water heater solutions for local MSME demand and after-sales support.';

const ABOUT =
  'Join us for an insightful Webinar on Solar Water Heater Assembly, designed for MSME owners, technicians, and entrepreneurs looking to expand into renewable energy solutions. Learn how solar water heaters work, how to assemble key components correctly, and how to deliver energy-efficient and sustainable solutions to your customers.';

const BENEFITS = [
  'Expert-led live session',
  'Q&A with industry mentors',
  'Certificate of participation',
  'Resource kit & follow-up support',
] as const;

const IMAGE_MAP: Record<string, ImageSourcePropType> = {
  milk: images.solutionPaneer,
  spice: images.solutionSpice,
  biscuit: images.workshopBiscuit,
  pickle: images.solutionPickle,
  bakery: images.solutionBakery,
  'up-noodles': images.solutionNamkeen,
  'up-jaggery': images.solutionJaggery,
  'up-icecream': images.solutionIcecream,
};

function CalendarIcon() {
  return (
    <View style={iconStyles.calendar}>
      <View style={iconStyles.calendarTop} />
      <View style={iconStyles.calendarBody}>
        <View style={iconStyles.calendarDot} />
        <View style={iconStyles.calendarDot} />
        <View style={iconStyles.calendarDot} />
        <View style={iconStyles.calendarDot} />
      </View>
    </View>
  );
}

function ClockIcon() {
  return (
    <View style={iconStyles.clock}>
      <View style={iconStyles.clockHandV} />
      <View style={iconStyles.clockHandH} />
    </View>
  );
}

function FeeIcon() {
  return <Text style={iconStyles.fee}>₹</Text>;
}

function PinIcon() {
  return (
    <View style={iconStyles.pinWrap}>
      <View style={iconStyles.pinHead}>
        <View style={iconStyles.pinHole} />
      </View>
      <View style={iconStyles.pinTip} />
    </View>
  );
}

export function WorkshopDetailsScreen({navigation, route}: Props) {
  const {
    workshopKey,
    title,
    shortTitle,
    date,
    time,
    fee,
    mode,
    status,
  } = route.params;
  const insets = useSafeAreaInsets();
  const [overviewExpanded, setOverviewExpanded] = useState(false);

  const heroImage = IMAGE_MAP[workshopKey] ?? images.workshopBiscuit;
  const modeLabel = mode === 'online' ? 'Online' : 'Offline';
  const venue =
    mode === 'online' ? 'Online – Live Webinar' : 'IID Campus – Live Workshop';
  const overviewPreview = useMemo(
    () => OVERVIEW.slice(0, 145).trimEnd() + '...',
    [],
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: 118 + insets.bottom},
        ]}
        bounces={false}>
        <View
          style={[styles.hero, {paddingTop: insets.top + spacing.spacing_2}]}>
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
              accessibilityRole="button"
              accessibilityLabel="Back">
              <Text style={styles.backChevron}>‹</Text>
            </Pressable>
            <View style={styles.headerCopy}>
              <Text style={styles.heroTitle}>WORKSHOP</Text>
              <Text style={styles.heroSubtitle} numberOfLines={1}>
                {shortTitle}
              </Text>
            </View>
            <View style={styles.backBtn} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.bannerWrap}>
            <Image
              source={heroImage}
              style={styles.banner}
              resizeMode="cover"
            />
            <View style={styles.bannerOverlay} pointerEvents="none">
              <Text style={styles.bannerTitle} numberOfLines={3}>
                {shortTitle.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.meta}>
              • {modeLabel}  • {status}
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <CalendarIcon />
                </View>
                <View style={styles.infoCopy}>
                  <Text style={styles.infoLabel}>Date</Text>
                  <Text style={styles.infoValue}>{date}</Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <ClockIcon />
                </View>
                <View style={styles.infoCopy}>
                  <Text style={styles.infoLabel}>Time</Text>
                  <Text style={styles.infoValue}>{time}</Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <FeeIcon />
                </View>
                <View style={styles.infoCopy}>
                  <Text style={styles.infoLabel}>Fee</Text>
                  <Text style={styles.infoValue}>{fee}</Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <PinIcon />
                </View>
                <View style={styles.infoCopy}>
                  <Text style={styles.infoLabel}>Venue</Text>
                  <Text style={styles.infoValue}>{venue}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.bodyText}>
              {overviewExpanded ? OVERVIEW : overviewPreview}{' '}
              <Text
                style={styles.readMore}
                onPress={() => setOverviewExpanded(v => !v)}>
                {overviewExpanded ? 'Read Less' : 'Read More'}
              </Text>
            </Text>

            <Text style={[styles.sectionTitle, styles.sectionFollow]}>
              Key Points of Discussion
            </Text>
            <Text style={styles.bodyText}>{KEY_POINTS}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>About This Webinar</Text>
            <Text style={styles.bodyText}>{ABOUT}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>What you get</Text>
            <View style={styles.benefits}>
              {BENEFITS.map(item => (
                <View key={item} style={styles.benefitRow}>
                  <Image
                    source={images.iconWhatYouGet}
                    style={styles.benefitIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.benefitText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {paddingBottom: Math.max(insets.bottom, spacing.spacing_5)},
        ]}>
        <View style={styles.feeCol}>
          <Text style={styles.feeLabel}>Workshop Registration</Text>
          <Text style={styles.feeAmount}>{fee.replace(' ', '')}</Text>
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

const iconStyles = StyleSheet.create({
  calendar: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.white,
    overflow: 'hidden',
  },
  calendarTop: {
    height: 4,
    backgroundColor: colors.white,
  },
  calendarBody: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
    gap: 2,
    justifyContent: 'center',
    alignContent: 'center',
  },
  calendarDot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1,
    backgroundColor: colors.white,
  },
  clock: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockHandV: {
    position: 'absolute',
    width: 1.5,
    height: 6,
    backgroundColor: colors.white,
    top: 3,
    borderRadius: 1,
  },
  clockHandH: {
    position: 'absolute',
    width: 5,
    height: 1.5,
    backgroundColor: colors.white,
    left: 8,
    top: 8,
    borderRadius: 1,
  },
  fee: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  pinWrap: {
    alignItems: 'center',
  },
  pinHead: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinHole: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
  },
  pinTip: {
    width: 0,
    height: 0,
    marginTop: -1,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.white,
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: spacing.spacing_6,
    paddingBottom: 48,
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
    fontSize: 30,
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
    fontSize: 16,
    letterSpacing: 0.4,
  },
  heroSubtitle: {
    ...fontStyles.body.regular.body_4,
    color: 'rgba(255,255,255,0.92)',
    marginTop: 2,
  },
  content: {
    marginTop: -28,
    paddingHorizontal: spacing.spacing_6,
    gap: spacing.spacing_5,
  },
  bannerWrap: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.white,
  },
  banner: {
    width: '100%',
    height: 168,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    padding: spacing.spacing_6,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  bannerTitle: {
    ...fontStyles.headings.heading_4,
    color: colors.white,
    fontSize: 20,
    lineHeight: 26,
    maxWidth: '78%',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.spacing_7,
  },
  cardTitle: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: spacing.spacing_2,
  },
  meta: {
    ...fontStyles.body.regular.body_4,
    color: colors.text_secondary,
    fontSize: 12,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing.spacing_7,
  },
  infoItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_4,
    paddingRight: spacing.spacing_3,
  },
  infoIcon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#2B7FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCopy: {
    flex: 1,
    minWidth: 0,
  },
  infoLabel: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    fontSize: 11,
  },
  infoValue: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 12,
    marginTop: 1,
  },
  sectionTitle: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 15,
    marginBottom: spacing.spacing_8,
  },
  sectionFollow: {
    marginTop: spacing.spacing_8,
  },
  bodyText: {
    ...fontStyles.body.regular.body_3,
    color: colors.text_secondary,
    lineHeight: 20,
  },
  readMore: {
    ...fontStyles.body.bold.body_2,
    color: '#2B7FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  benefits: {
    gap: spacing.spacing_5,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_4,
  },
  benefitIcon: {
    width: 22,
    height: 22,
  },
  benefitText: {
    ...fontStyles.body.regular.body_3,
    color: colors.text_secondary,
    flex: 1,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    experimental_backgroundImage:
      'linear-gradient(to right, #1C398E 0%, #1447E6 50%, #2B7FFF 100%)',
    paddingHorizontal: spacing.spacing_6,
    paddingTop: spacing.spacing_8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.spacing_4,
  },
  feeCol: {
    flexShrink: 1,
  },
  feeLabel: {
    ...fontStyles.body.regular.body_5,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
  },
  feeAmount: {
    ...fontStyles.headings.heading_5,
    color: colors.white,
    fontSize: 20,
    lineHeight: 26,
    marginTop: 1,
  },
  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_3,
  },
  buyBtn: {
    backgroundColor: '#F5C518',
    borderRadius: 999,
    paddingHorizontal: spacing.spacing_5,
    paddingVertical: spacing.spacing_4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_2,
  },
  buyIcon: {
    width: 12,
    height: 12,
    tintColor: colors.text,
  },
  buyText: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 12,
  },
  cartBtn: {
    borderWidth: 0.8,
    borderColor: colors.white,
    borderRadius: 999,
    paddingHorizontal: spacing.spacing_5,
    paddingVertical: spacing.spacing_4,
  },
  cartText: {
    ...fontStyles.body.bold.body_2,
    color: colors.white,
    fontSize: 12,
  },
});
