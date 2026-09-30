import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation, type CompositeNavigationProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import {APP_TAGLINE} from '../../constants';
import {openServiceCategory} from '../../navigation/openSolutionScreen';
import type {MainTabParamList, RootStackParamList} from '../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../module/style-guide';
import {noop} from '../../utils';
import {EdpProgramme} from './components/EdpProgramme';
import {BusinessSolution} from './components/BusinessSolution';
import {BusinessConsultation} from './components/BusinessConsultation';
import {IndustryCertifiedCourses} from './components/IndustryCertifiedCourses';
import {LearnFromIndustryExperts} from './components/LearnFromIndustryExperts';
import {UnlockSubsidies} from './components/UnlockSubsidies';
import {EntrepreneurSuccessStories} from './components/EntrepreneurSuccessStories';
import {
  ExpertWorkshopBanner,
  HomeBrandFooter,
} from './components/HomeFooter';

const SERVICES = [
  {key: 'business-solution', label: 'Business\nSolution', icon: images.iconBusinessSolution},
  {key: 'project-report', label: 'Project\nReport', icon: images.iconProjectReport},
  {key: 'industrial-courses', label: 'Industrial\nCourses', icon: images.iconIndustrialCourses},
  {key: 'business-services', label: 'Business\nServices', icon: images.iconBusinessServices},
  {key: 'expert-connect', label: 'Expert\nConnect', icon: images.iconExpertConnect},
  {key: 'franchise-gateway', label: 'Franchise\nGateway', icon: images.iconFranchiseGateway},
  {key: 'workshop', label: 'Workshop', icon: images.iconWorkshop},
  {key: 'schemes', label: 'Schemes', icon: images.iconSchemes},
] as const;

export function HomeScreen() {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        BottomTabNavigationProp<MainTabParamList, 'HomeTab'>,
        NativeStackNavigationProp<RootStackParamList>
      >
    >();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}>
        <View
          style={[
            styles.blueSection,
            {paddingTop: insets.top + spacing.spacing_4},
          ]}>
          <Image
            source={images.homePattern}
            style={styles.topPattern}
            resizeMode="cover"
            pointerEvents="none"
          />
          <View style={styles.blueInner}>
            <View style={styles.topBar}>
              <Image
                source={images.home_logo}
                style={styles.logo}
                resizeMode="contain"
                accessibilityLabel={APP_TAGLINE}
              />
              <Pressable
                onPress={() => navigation.navigate('Profile')}
                style={styles.profileBtn}
                accessibilityRole="button"
                accessibilityLabel="Profile">
                <Image source={images.iconProfile} style={styles.profileIcon} />
              </Pressable>
            </View>

            <Text style={[fontStyles.headings.heading_3, styles.heading]}>
              How we{'\n'}can help you?
            </Text>

            <View style={styles.searchBar}>
              <View style={styles.searchLeft}>
                <Image
                  source={images.iconSearch}
                  style={styles.searchIcon}
                />
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

            <View style={styles.grid}>
              {SERVICES.map(service => (
                <Pressable
                  key={service.key}
                  style={styles.tile}
                  onPress={() => openServiceCategory(navigation, service.key)}
                  accessibilityRole="button"
                  accessibilityLabel={service.label.replace('\n', ' ')}>
                  <Image source={service.icon} style={styles.tileIcon} resizeMode="contain" />
                  <Text style={styles.tileLabel}>{service.label}</Text>
                </Pressable>
              ))}
            </View>

            <EdpProgramme />
          </View>
        </View>

        <BusinessSolution />
        <BusinessConsultation />
        <IndustryCertifiedCourses />
        <LearnFromIndustryExperts />
        <UnlockSubsidies />
        <EntrepreneurSuccessStories />
        <HomeBrandFooter />
      </ScrollView>
      <ExpertWorkshopBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
  },
  blueSection: {
    backgroundColor: '#227AF5',
    experimental_backgroundImage:
      'linear-gradient(#0682FA 0%, #227AF5 50%, #093EC1 100%)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    paddingBottom: spacing.spacing_9,
  },
  blueInner: {
    paddingHorizontal: spacing.spacing_6,
  },
  topPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '58%',
    opacity: 0.11,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.spacing_9,
  },
  logo: {
    width: 100,
    height: 40,
  },
  profileBtn: {
    width: 32,
    height: 32,
    borderRadius: 22,
    backgroundColor: '#052A87',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.white,
    marginRight:spacing.spacing_10
  },
  profileIcon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
  heading: {
    color: colors.white,
    fontSize: 28,
    lineHeight: 34,
    marginBottom: spacing.spacing_9,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.radius_3,
    height: 54,
    paddingHorizontal: spacing.spacing_6,
    marginBottom: spacing.spacing_9,
  },
  searchLeft: {
    width: 28,
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
    width: 18,
    height: 18,
    tintColor: '#0171DD',
  },
  searchPlaceholder: {
    position: 'absolute',
    left: 0,
    right: 0,
    color: colors.disabled_text,
    fontSize: 13,
  },
  searchInput: {
    color: colors.text,
    fontSize: 13,
    padding: 0,
    margin: 0,
    height: 40,
  },
  searchDivider: {
    width: 0.7,
    height: 22,
    backgroundColor: '#E5E7EB',
  },
  micIcon: {
    width: 20,
    height: 20,
    tintColor: '#0171DD',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.spacing_4,
    marginBottom: spacing.spacing_11,
  },
  tile: {
    width: '23%',
    backgroundColor: colors.surface,
    borderRadius: radius.radius_4,
    paddingVertical: spacing.spacing_4,
    paddingHorizontal: spacing.spacing_2,
    alignItems: 'center',
    minHeight: 82,
    gap: spacing.spacing_4,
  },
  tileIcon: {
    width: 32,
    height: 32,
  },
  tileLabel: {
    ...fontStyles.body.medium.body_4,
    color: colors.primary_dark,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 13,
  },
});
