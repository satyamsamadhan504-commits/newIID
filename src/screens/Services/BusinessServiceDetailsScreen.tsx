import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import type {ServicesStackParamList} from '../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../module/style-guide';
import {noop} from '../../utils';

type Props = NativeStackScreenProps<
  ServicesStackParamList,
  'BusinessServiceDetails'
>;

const TABS = ['About us', 'Prerequisites', 'Key Benefits', 'Ideal For'] as const;

const HERO_SUBTITLE =
  'Flexible plans designed for every entrepreneurial stage — from first idea to full-scale industry.';

const ABOUT_LEAD =
  'Private Limited Company registration, commonly referred as Private Limited Company Formation is the legal process of incorporating a company under the Companies Act, 2013, through the Ministry of Corporate Affairs (MCA)';

const ABOUT_BODY =
  'A Private Limited Company is a separate legal entity, meaning the company has its own identity, distinct from its owners. It offers limited liability protection, structured ownership, and higher business credibility. Once registered with the Ministry of Corporate Affairs (MCA), the company gets its own identity, PAN, bank account and legal recognition. It allows the business to operate lawfully, raise funds, enter contracts and limit the personal liability of its shareholders.';

const ELIGIBILITY_ITEMS = [
  {
    key: 'members',
    title: 'Members',
    detail: 'Minimum 2 (maximum 200)',
  },
  {
    key: 'directors',
    title: 'Directors',
    detail: 'Must be resident in India',
  },
  {
    key: 'age',
    title: 'Age',
    detail: 'Directors must be 18+',
  },
  {
    key: 'capital',
    title: 'Capital',
    detail: 'No minimum paid-up capital',
  },
  {
    key: 'office',
    title: 'Registered Office',
    detail: 'Valid Indian address',
  },
  {
    key: 'din',
    title: 'DIN & DSC',
    detail: 'Mandatory for all directors',
  },
] as const;

const KEY_BENEFITS = [
  {
    key: 'liability',
    title: 'Limited liability',
    body: 'Directors and shareholders are financially responsible only up to the amount they have invested, not beyond that.',
  },
  {
    key: 'credibility',
    title: 'Higher credibility',
    body: 'A registered Private Limited Company builds stronger trust with customers, vendors, banks and government bodies.',
  },
  {
    key: 'funding',
    title: 'Easy funding through investors',
    body: 'Investors and VCs prefer Private Limited structures, making equity funding and share allotment simpler.',
  },
  {
    key: 'perpetual',
    title: 'Perpetual Existence',
    body: 'The company continues to exist even if directors or shareholders change, ensuring long-term business continuity.',
  },
  {
    key: 'ownership',
    title: 'Structured Ownership',
    body: 'Shareholding is clearly defined, making ownership transfer, capital raising and governance more organised.',
  },
  {
    key: 'entity',
    title: 'Separate Legal Entity',
    body: 'The company has its own legal identity, distinct from its owners, and can own assets, sue and be sued in its name.',
  },
] as const;

const KEY_BENEFITS_INTRO =
  'A Private Limited Company is the most popular form of business registration in India for startups and growing businesses. It offers protection, credibility and a clear path to scale.';

function EligibilityIcon({type}: {type: (typeof ELIGIBILITY_ITEMS)[number]['key']}) {
  if (type === 'members') {
    return (
      <View style={iconStyles.iconInner}>
        <View style={iconStyles.personLg} />
        <View style={iconStyles.personSm} />
      </View>
    );
  }
  if (type === 'directors') {
    return (
      <View style={iconStyles.iconInner}>
        <View style={iconStyles.houseRoof} />
        <View style={iconStyles.houseBody} />
      </View>
    );
  }
  if (type === 'age') {
    return (
      <View style={iconStyles.iconInner}>
        <View style={iconStyles.cake} />
        <View style={iconStyles.cakeTop} />
      </View>
    );
  }
  if (type === 'capital') {
    return (
      <View style={iconStyles.iconInnerRow}>
        <View style={[iconStyles.bar, {height: 6}]} />
        <View style={[iconStyles.bar, {height: 10}]} />
        <View style={[iconStyles.bar, {height: 14}]} />
      </View>
    );
  }
  if (type === 'office') {
    return (
      <View style={iconStyles.iconInner}>
        <View style={iconStyles.pinHead} />
        <View style={iconStyles.pinTip} />
      </View>
    );
  }
  return (
    <View style={iconStyles.iconInner}>
      <View style={iconStyles.shield}>
        <Text style={iconStyles.shieldCheck}>✓</Text>
      </View>
    </View>
  );
}

function PriceArrow() {
  return (
    <View style={styles.priceArrow}>
      <View style={styles.arrowShaft} />
      <View style={styles.arrowHead} />
    </View>
  );
}

export function BusinessServiceDetailsScreen({navigation, route}: Props) {
  const {title, category, fromFee, serviceKey} = route.params;
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<(typeof TABS)[number]>('About us');
  const [openBenefit, setOpenBenefit] = useState<string | null>(
    KEY_BENEFITS[0].key,
  );
  const isCompany = serviceKey === 'pvt-ltd';
  const heading = isCompany
    ? 'What is Private Limited Company Registration?'
    : `What is ${title}?`;

  const toggleBenefit = (key: string) => {
    setOpenBenefit(current => (current === key ? null : key));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        bounces={false}>
        <View style={styles.heroShell}>
        <View style={[styles.hero, {paddingTop: insets.top + spacing.spacing_2}]}>
          <View style={styles.blobLarge} pointerEvents="none" />
          <View style={styles.blobSmall} pointerEvents="none" />

          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            accessibilityRole="button"
            accessibilityLabel="Back">
            <Text style={styles.backChevron}>‹</Text>
          </Pressable>

          <View style={styles.badgeWrap}>
            <Image
              source={images.badgeRibbon}
              style={styles.badgeRibbon}
              resizeMode="stretch"
            />
            <Text style={styles.badgeText} numberOfLines={1}>
              {category.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{HERO_SUBTITLE}</Text>

          <Pressable
            style={styles.priceCard}
            onPress={noop}
            accessibilityRole="button"
            accessibilityLabel={`From ${fromFee}`}>
            <View style={styles.priceCopy}>
              <Text style={styles.priceValue}>From {fromFee}</Text>
              <Text style={styles.priceNote}>
                exclusive GST, As per the State Fees
              </Text>
            </View>
            <PriceArrow />
          </Pressable>

          <View style={styles.trustRow}>
            <View style={styles.trustCol}>
              <View style={styles.trustLabelRow}>
                <View style={styles.ratingStar}>
                  <Text style={styles.ratingStarGlyph}>☆</Text>
                </View>
                <View style={styles.trustCopy}>
                  <Text style={styles.trustText}>Rating 4.8 (1.2k)</Text>
                  <View style={styles.stars}>
                    {[0, 1, 2, 3].map(index => (
                      <Text key={index} style={styles.star}>
                        ★
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.trustCol}>
              <View style={styles.trustLabelRow}>
                <Image
                  source={images.iconVerified}
                  style={styles.shieldIcon}
                  resizeMode="contain"
                />
                <View style={styles.trustCopy}>
                  <Text style={styles.trustText}>Verified Experts</Text>
                  <View style={styles.dots}>
                    {[0, 1, 2, 3].map(index => (
                      <View key={index} style={styles.dot}>
                        <Text style={styles.dotCheck}>✓</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        </View>

        <View style={styles.tabBar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabs}>
            {TABS.map(item => {
              const selected = item === tab;
              return (
                <Pressable
                  key={item}
                  onPress={() => setTab(item)}
                  style={[styles.tab, selected && styles.tabSelected]}
                  accessibilityRole="button"
                  accessibilityState={{selected}}>
                  <Text
                    style={[
                      styles.tabLabel,
                      selected && styles.tabLabelSelected,
                    ]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.body}>
          <View style={styles.sheet}>
            {tab === 'About us' ? (
              <>
                <Text style={styles.eyebrow}>EXPLORE SERVICE</Text>
                <Text style={styles.sheetTitle}>{heading}</Text>
                <Text style={styles.paragraph}>
                  {isCompany
                    ? ABOUT_LEAD
                    : `${title} is a guided business service that covers documentation, filing and follow-up so you can start with a clear, compliant setup.`}
                </Text>
                <Text style={styles.paragraph}>
                  {isCompany
                    ? ABOUT_BODY
                    : `Our team handles the checklist, application and status updates for ${title}. You get a dedicated process, expert review and support until the service is completed.`}
                </Text>
              </>
            ) : null}

            {tab === 'Prerequisites' ? (
              <>
                <Text style={styles.eyebrow}>EXPLORE SERVICE</Text>
                <Text style={styles.sheetTitle}>
                  Eligibility Criteria to Register
                </Text>
                <Text style={styles.paragraph}>
                  To register a Private Limited Company in India, the following
                  eligibility conditions must be met:
                </Text>

                <View style={styles.infoBox}>
                  <View style={styles.infoIcon}>
                    <Text style={styles.infoIconText}>i</Text>
                  </View>
                  <Text style={styles.infoText}>
                    A minimum of two partners are required to form an LLP, with
                    at least one designated partner being an Indian resident.
                  </Text>
                </View>

                <View style={styles.eligibilityGrid}>
                  {ELIGIBILITY_ITEMS.map(item => (
                    <View key={item.key} style={styles.eligibilityCard}>
                      <View style={styles.eligibilityIconWrap}>
                        <EligibilityIcon type={item.key} />
                      </View>
                      <Text style={styles.eligibilityTitle}>{item.title}</Text>
                      <Text style={styles.eligibilityDetail}>{item.detail}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.perkRow}>
                  {['Govt Verified', 'Fast Process', 'Expert Help'].map(
                    label => (
                      <View key={label} style={styles.perkItem}>
                        <View style={styles.perkDot} />
                        <Text style={styles.perkLabel}>{label}</Text>
                      </View>
                    ),
                  )}
                </View>
              </>
            ) : null}

            {tab === 'Key Benefits' ? (
              <>
                <Text style={styles.eyebrow}>EXPLORE SERVICE</Text>
                <Text style={styles.sheetTitle}>Key Benefits</Text>
                <Text style={styles.paragraph}>{KEY_BENEFITS_INTRO}</Text>

                <View style={styles.benefitList}>
                  {KEY_BENEFITS.map((item, index) => {
                    const open = openBenefit === item.key;
                    return (
                      <View key={item.key}>
                        {index > 0 ? <View style={styles.benefitDivider} /> : null}
                        <Pressable
                          onPress={() => toggleBenefit(item.key)}
                          style={styles.benefitHeader}
                          accessibilityRole="button"
                          accessibilityState={{expanded: open}}>
                          <Text style={styles.benefitTitle}>{item.title}</Text>
                          <Text style={styles.benefitChevron}>
                            {open ? '⌃' : '⌄'}
                          </Text>
                        </Pressable>
                        {open ? (
                          <Text style={styles.benefitBody}>{item.body}</Text>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              </>
            ) : null}

            {tab === 'Ideal For' ? (
              <>
                <Text style={styles.eyebrow}>WHO IT’S FOR</Text>
                <Text style={styles.sheetTitle}>Ideal for</Text>
                <Text style={styles.paragraph}>
                  Founders who want a formal company, MSME owners planning to
                  scale, and teams that need a separate legal identity before
                  hiring, invoicing or raising capital.
                </Text>
                <Text style={styles.paragraph}>
                  It also suits professionals who want expert-led filing instead
                  of managing portal steps on their own.
                </Text>
              </>
            ) : null}
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.actionBar,
          {paddingBottom: Math.max(insets.bottom, spacing.spacing_6)},
        ]}>
        <Pressable
          style={styles.checklistBtn}
          onPress={noop}
          accessibilityRole="button"
          accessibilityLabel="Document Checklist">
          <Text style={styles.checklistIcon}>☰</Text>
          <Text style={styles.checklistText}>Document Checklist</Text>
        </Pressable>
      </View>
    </View>
  );
}

const ACCENT = '#067FF3';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F3F5F8',
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 110,
  },
  heroShell: {
    backgroundColor: '#1E1A4D',
    
  },
  hero: {
    backgroundColor: '#2454D6',
    paddingHorizontal: spacing.spacing_8,
    paddingBottom: spacing.spacing_8,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  blobLarge: {
    position: 'absolute',
    width: 220,
    height: 210,
    borderRadius: 230,
    backgroundColor: 'rgba(255,255,255,0.10)',
    right: -30,
    top: -70,
  },
  blobSmall: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.07)',
    right: -50,
    top: 70,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: spacing.spacing_4,
  },
  backChevron: {
    color: colors.white,
    fontSize: 32,
    lineHeight: 34,
    marginTop: -4,
  },
  badgeWrap: {
    alignSelf: 'flex-start',
    height: 28,
    minWidth: 176,
    justifyContent: 'center',
    marginBottom: spacing.spacing_6,
    paddingRight: 18,
  },
  badgeRibbon: {
    ...StyleSheet.absoluteFill,
    width: undefined,
    height: undefined,
  },
  badgeText: {
    ...fontStyles.body.bold.body_3,
    color: colors.text,
    fontSize: 10,
    letterSpacing: 0.4,
    paddingHorizontal: spacing.spacing_4,
  },
  title: {
    ...fontStyles.headings.heading_4,
    color: colors.white,
    fontSize: 22,
    lineHeight: 28,
    marginBottom: spacing.spacing_4,
  },
  subtitle: {
    ...fontStyles.body.regular.body_4,
    color: 'rgba(255,255,255,0.88)',
    lineHeight: 18,
    marginBottom: spacing.spacing_8,
    maxWidth: 320,
  },
  priceCard: {
    backgroundColor: colors.white,
    borderRadius: radius.radius_3,
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_6,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.spacing_8,
  },
  priceCopy: {
    flex: 1,
    paddingRight: spacing.spacing_4,
  },
  priceValue: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
  },
  priceNote: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    marginTop: 2,
    fontSize: 11,
  },
  priceArrow: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowShaft: {
    position: 'absolute',
    width: 12,
    height: 1.6,
    borderRadius: 1,
    backgroundColor: colors.white,
    left: 9,
  },
  arrowHead: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderTopWidth: 1.6,
    borderRightWidth: 1.6,
    borderColor: colors.white,
    transform: [{rotate: '45deg'}],
    right: 9,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.spacing_6,
    marginTop: spacing.spacing_8,
    marginLeft: spacing.spacing_12,
  },
  trustCol: {
    flex: 1,
  },
  trustLabelRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.spacing_3,
  },
  trustCopy: {
    flex: 1,
    gap: spacing.spacing_2,
  },
  ratingStar: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  ratingStarGlyph: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 18,
    marginTop: 1,
  },
  shieldIcon: {
    width: 16,
    height: 16,
    tintColor: colors.white,
    marginTop: 2,
  },
  trustText: {
    ...fontStyles.body.medium.body_4,
    color: colors.white,
    fontSize: 12,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    color: '#F5C518',
    fontSize: 11,
    lineHeight: 14,
  },
  dots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3DDC84',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCheck: {
    color: colors.white,
    fontSize: 8,
    fontWeight: '700',
    lineHeight: 10,
    marginTop: -0.5,
  },
  tabBar: {
    backgroundColor: '#1E1A4D',
    paddingVertical: spacing.spacing_5,
  },
  tabs: {
    flexDirection: 'row',
    gap: spacing.spacing_3,
    paddingHorizontal: spacing.spacing_6,
    paddingRight: spacing.spacing_8,
  },
  tab: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radius.radius_full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_4,
  },
  tabSelected: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  tabLabel: {
    ...fontStyles.body.medium.body_4,
    color: colors.white,
    fontSize: 12,
  },
  tabLabelSelected: {
    color: colors.text,
  },
  body: {
    backgroundColor: '#F3F5F8',
    paddingHorizontal: spacing.spacing_6,
    paddingTop: spacing.spacing_6,
  },
  sheet: {
    backgroundColor: colors.white,
    borderRadius: radius.radius_4,
    paddingHorizontal: spacing.spacing_8,
    paddingVertical: spacing.spacing_9,
  },
  eyebrow: {
    ...fontStyles.body.medium.body_4,
    color: ACCENT,
    letterSpacing: 0.6,
    fontSize: 11,
    marginBottom: spacing.spacing_4,
  },
  sheetTitle: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: spacing.spacing_6,
  },
  paragraph: {
    ...fontStyles.body.regular.body_3,
    color: '#5E6A75',
    lineHeight: 21,
    marginBottom: spacing.spacing_6,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.spacing_4,
    backgroundColor: '#FFF8E8',
    borderRadius: radius.radius_3,
    paddingHorizontal: spacing.spacing_5,
    paddingVertical: spacing.spacing_5,
    marginBottom: spacing.spacing_8,
  },
  infoIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F5A524',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  infoIconText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14,
  },
  infoText: {
    ...fontStyles.body.regular.body_4,
    color: '#6B5B3E',
    flex: 1,
    lineHeight: 18,
    fontSize: 12,
  },
  eligibilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.spacing_4,
  },
  eligibilityCard: {
    width: '48.5%',
    backgroundColor: '#EEF2F8',
    borderRadius: radius.radius_3,
    paddingHorizontal: spacing.spacing_5,
    paddingVertical: spacing.spacing_5,
    minHeight: 108,
  },
  eligibilityIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#D6E2F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.spacing_4,
  },
  eligibilityTitle: {
    ...fontStyles.body.bold.body_3,
    color: colors.text,
    fontSize: 13,
    marginBottom: spacing.spacing_1,
  },
  eligibilityDetail: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    fontSize: 11,
    lineHeight: 15,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: spacing.spacing_8,
    gap: spacing.spacing_5,
  },
  perkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_2,
  },
  perkDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#B8C0CC',
  },
  perkLabel: {
    ...fontStyles.body.regular.body_4,
    color: '#9AA3AF',
    fontSize: 12,
    lineHeight: 16,
  },
  benefitList: {
    marginTop: spacing.spacing_2,
  },
  benefitDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E9EF',
    marginVertical: spacing.spacing_5,
  },
  benefitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.spacing_4,
    paddingVertical: spacing.spacing_1,
  },
  benefitTitle: {
    ...fontStyles.body.bold.body_3,
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  benefitChevron: {
    color: '#8A94A6',
    fontSize: 16,
    lineHeight: 18,
    width: 18,
    textAlign: 'center',
  },
  benefitBody: {
    ...fontStyles.body.regular.body_4,
    color: '#6B7684',
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.spacing_3,
    paddingRight: spacing.spacing_8,
  },
  actionBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingTop: spacing.spacing_4,
    paddingHorizontal: spacing.spacing_8,
    backgroundColor: 'transparent',
  },
  checklistBtn: {
    backgroundColor: '#008236',
    borderRadius: radius.radius_full,
    paddingHorizontal: spacing.spacing_8,
    paddingVertical: spacing.spacing_5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_3,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 3},
  },
  checklistIcon: {
    color: colors.white,
    fontSize: 14,
  },
  checklistText: {
    ...fontStyles.body.bold.body_3,
    color: colors.white,
    fontSize: 13,
  },
});

const iconStyles = StyleSheet.create({
  iconInner: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInnerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 16,
  },
  personLg: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.4,
    borderColor: ACCENT,
    marginRight: 4,
  },
  personSm: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1.2,
    borderColor: ACCENT,
  },
  houseRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: ACCENT,
    marginBottom: 1,
  },
  houseBody: {
    width: 10,
    height: 7,
    borderWidth: 1.4,
    borderColor: ACCENT,
    borderTopWidth: 0,
  },
  cake: {
    width: 12,
    height: 8,
    borderRadius: 2,
    borderWidth: 1.4,
    borderColor: ACCENT,
  },
  cakeTop: {
    position: 'absolute',
    top: 2,
    width: 2,
    height: 4,
    backgroundColor: ACCENT,
    borderRadius: 1,
  },
  bar: {
    width: 3,
    borderRadius: 1,
    backgroundColor: ACCENT,
  },
  pinHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.4,
    borderColor: ACCENT,
  },
  pinTip: {
    width: 0,
    height: 0,
    marginTop: -1,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: ACCENT,
  },
  shield: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1.4,
    borderColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldCheck: {
    color: ACCENT,
    fontSize: 9,
    fontWeight: '700',
    lineHeight: 10,
  },
});
