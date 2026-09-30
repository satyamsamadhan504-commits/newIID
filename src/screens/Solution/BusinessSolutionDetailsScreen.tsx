import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import type {SolutionStackParamList} from '../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../module/style-guide';
import {FONT_FAMILY} from '../../module/style-guide/style-guide.constants';
import {noop} from '../../utils';

const INVESTMENTS = ['upto 10 Lakh', '10 - 50 Lakh', '50 Lakh - 2 Cr'] as const;

const PANEER_OVERVIEW =
  'Paneer making is a lucrative business model in India, capitalizing on the growing demand for dairy products in both urban and rural markets. With minimal investment in equipment and raw materials, entrepreneurs can produce fresh, high-quality paneer, catering to diverse culinary needs. This venture not only offers a steady income stream but also supports local dairy farmers, promoting sustainable practices in the agricultural sector. Embrace the paneer making industry to tap into a thriving market while contributing to the nation’s economy.';

const PANEER_DETAILS = [
  'Paneer making is a traditional dairy processing business that holds significant importance in the Indian culinary landscape. With a growing demand for vegetarian protein sources, paneer has become a staple ingredient in various dishes across the country. The process involves curdling milk, separating the curds from the whey, and pressing the curds to form a soft cheese. This industry not only caters to the domestic market but also presents opportunities for export, making it a viable venture for MSMEs. The primary audience for paneer making includes local dairy farmers, small-scale manufacturers, and entrepreneurs interested in the food processing sector.',
  'As health consciousness rises among consumers, the preference for fresh and natural food products has increased, further boosting the paneer market. Additionally, with the rise of vegetarianism, the demand for high-quality paneer is expected to grow, providing ample opportunities for new entrants in this industry. Key value in the paneer making business lies in its ability to produce high-quality, fresh products that meet consumer preferences. By adopting modern production techniques and maintaining hygiene standards, MSMEs can establish a strong brand presence.',
  'Furthermore, leveraging local milk sources can reduce costs and enhance sustainability, making this business model not only profitable but also environmentally friendly.',
];

type Props = NativeStackScreenProps<
  SolutionStackParamList,
  'BusinessSolutionDetails'
>;

function copyFor(title: string, description: string) {
  if (title === 'Paneer Making') {
    return {overview: PANEER_OVERVIEW, details: PANEER_DETAILS};
  }
  return {
    overview: description,
    details: [
      `${title} is a practical business model for MSMEs. ${description}`,
      `Demand for ${title.toLowerCase()} continues to grow across local and regional markets, giving new entrepreneurs room to start with a focused setup and scale as orders increase.`,
    ],
  };
}

export function BusinessSolutionDetailsScreen({navigation, route}: Props) {
  const {title, category, description} = route.params;
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [investment, setInvestment] =
    useState<(typeof INVESTMENTS)[number]>('upto 10 Lakh');
  const copy = copyFor(title, description);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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

          <View style={styles.searchBar}>
            <View style={styles.searchLeft}>
              <Image source={images.iconSearch} style={styles.searchIcon} />
            </View>
            <View style={styles.searchMiddle}>
              {searchQuery.length === 0 ? (
                <Text
                  style={styles.searchPlaceholder}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  pointerEvents="none">
                  Search Business Ideas, Courses, DPR reports...
                </Text>
              ) : null}
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
                accessibilityLabel="Search"
                numberOfLines={1}
                multiline={false}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.searchRight}>
              <View style={styles.searchDivider} />
              <Pressable onPress={noop} accessibilityLabel="Voice search">
                <Image source={images.iconMic} style={styles.micIcon} />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.bodyText}>{copy.overview}</Text>

          <View style={[styles.action, { marginBottom: 6 }]}>
            <View style={[styles.actionIcon, styles.actionIconVideo]}>
              <View style={styles.play} />
            </View>
            <View style={styles.actionCopy}>
              <Text style={styles.actionTitle}>Introduction Video</Text>
              <Text style={styles.actionSubtitle} numberOfLines={1}>
                {title} is a lucrative business
              </Text>
            </View>
            <Pressable
              onPress={() =>
                Alert.alert('Introduction Video', `Playing ${title} (demo).`)
              }
              accessibilityRole="button">
              <Text style={styles.actionLink}>Watch Now</Text>
            </Pressable>
          </View>

          <View style={styles.action}>
            <View style={[styles.actionIcon, styles.actionIconPlan]}>
              <Image
                source={images.iconBusinessSolution}
                style={styles.planIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.actionCopy}>
              <Text style={styles.actionTitle}>Personalized Business Plan</Text>
              <Text style={styles.actionSubtitle} numberOfLines={1}>
                {title} is a lucrative business
              </Text>
            </View>
            <Pressable
              onPress={() =>
                Alert.alert(
                  'Business Plan',
                  `Generating a plan for ${title} (demo).`,
                )
              }
              accessibilityRole="button">
              <Text style={styles.actionLink}>Generate Now</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.card, styles.cardFollow]}>
          <Text style={styles.sectionTitle}>Investments</Text>
          <View style={styles.chips}>
            {INVESTMENTS.map(item => {
              const selected = item === investment;
              return (
                <Pressable
                  key={item}
                  onPress={() => setInvestment(item)}
                  style={[styles.chip, selected && styles.chipSelected]}
                  accessibilityRole="button"
                  accessibilityState={{selected}}>
                  <Text
                    style={[
                      styles.chipLabel,
                      selected && styles.chipLabelSelected,
                    ]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>{title} Details</Text>
          {copy.details.map(paragraph => (
            <Text key={paragraph.slice(0, 24)} style={styles.bodyText}>
              {paragraph}
            </Text>
          ))}
        </View>
      </ScrollView>

      <Pressable
        style={styles.banner}
        onPress={() =>
          Alert.alert('Business Plan', `Generating a plan for ${title} (demo).`)
        }
        accessibilityRole="button"
        accessibilityLabel='Generate Personalized "Business Plan"'>
        <Image
          source={images.iconExpertWorkshop}
          style={styles.bannerIcon}
          resizeMode="contain"
        />
        <Text style={styles.bannerText} numberOfLines={1}>
          Generate Personalized{' '}
          <Text style={styles.bannerEm}>“Business Plan”</Text>
        </Text>
        <Text style={styles.bannerAction}>Generate Now</Text>
        <Text style={styles.bannerChevron}>{'>'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.spacing_10,
  },
  hero: {
    backgroundColor: '#1E4ED8',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: spacing.spacing_6,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.spacing_6,
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
    ...fontStyles.headings.heading_5,
    color: colors.white,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...fontStyles.body.regular.body_4,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.radius_3,
    height: 48,
    paddingHorizontal: spacing.spacing_6,
    marginTop: spacing.spacing_5,
    //marginVertical: spacing.spacing_2,
  },
  searchLeft: {
    width: 24,
    flexShrink: 0,
    justifyContent: 'center',
  },
  searchMiddle: {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    height: '100%',
    marginRight: spacing.spacing_3,
  },
  searchRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    gap: spacing.spacing_5,
  },
  searchIcon: {
    width: 16,
    height: 16,
    tintColor: '#0171DD',
  },
  searchPlaceholder: {
    position: 'absolute',
    left: 0,
    right: 0,
    color: colors.disabled_text,
    fontSize: 12,
  },
  searchInput: {
    color: colors.text,
    fontSize: 12,
    padding: 0,
    margin: 0,
    height: 36,
  },
  searchDivider: {
    width: 1.5,
    height: 20,
    backgroundColor: '#B8C0CC',
  },
  micIcon: {
    width: 16,
    height: 16,
    tintColor: '#0171DD',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    marginHorizontal: spacing.spacing_6,
    marginTop: -24,
    paddingVertical: spacing.spacing_10,
    paddingHorizontal: spacing.spacing_8,
    gap: spacing.spacing_6,
    elevation: 4,
    shadowColor: '#0F172A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  cardFollow: {
    marginTop: spacing.spacing_6,
  },
  sectionTitle: {
    ...fontStyles.headings.heading_5,
    color: colors.text,
    fontSize: 18,
    lineHeight: 24,
  },
  bodyText: {
    ...fontStyles.body.regular.body_3,
    color: colors.text_secondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: spacing.spacing_6,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing_4,
    marginBottom: spacing.spacing_6,
  },
  actionIcon: {
    width: 34,
    height: 34,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconVideo: {
    backgroundColor: '#F5B400',
  },
  actionIconPlan: {
    backgroundColor: colors.input_accent,
  },
  play: {
    width: 0,
    height: 0,
    marginLeft: 3,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderLeftWidth: 11,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: colors.white,
  },
  planIcon: {
    width: 22,
    height: 22,
    tintColor: colors.white,
  },
  actionCopy: {
    flex: 1,
    minWidth: 0,
  },
  actionTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
  },
  actionSubtitle: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    marginTop: 2,
  },
  actionLink: {
    ...fontStyles.body.medium.body_4,
    color: colors.input_accent,
    fontSize: 10,
    marginBottom: 2,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.spacing_4,
  },
  chip: {
    backgroundColor: '#F1F2F4',
    borderRadius: radius.radius_full,
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_4,
  },
  chipSelected: {
    backgroundColor: colors.text,
  },
  chipLabel: {
    ...fontStyles.body.medium.body_4,
    color: colors.text_secondary,
    fontSize: 12,
  },
  chipLabelSelected: {
    color: colors.white,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C800DE',
    experimental_backgroundImage:
      'linear-gradient(to right, #C800DE 0%, #7008E7 100%)',
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_7,
    gap: spacing.spacing_3,
  },
  bannerIcon: {
    width: 16,
    height: 16,
    tintColor: colors.white,
  },
  bannerText: {
    ...fontStyles.body.regular.body_5,
    flex: 1,
    color: colors.white,
    fontSize: 11,
    lineHeight: 14,
  },
  bannerEm: {
    fontFamily: FONT_FAMILY.ARCHIVO_MEDIUM,
    color: colors.white,
  },
  bannerAction: {
    ...fontStyles.body.bold.body_3,
    color: colors.white,
    fontSize: 11,
    lineHeight: 14,
  },
  bannerChevron: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 16,
    fontFamily: FONT_FAMILY.ARCHIVO_BOLD,
    marginLeft: -2,
  },
});
