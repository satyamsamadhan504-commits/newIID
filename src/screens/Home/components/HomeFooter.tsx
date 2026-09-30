import React from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {images} from '../../../assets/images';
import {colors, fontStyles, spacing} from '../../../module/style-guide';
import {FONT_FAMILY} from '../../../module/style-guide/style-guide.constants';

const WATERMARK = '#E2E8F0';
const BANNER_START = '#C800DE';
const BANNER_END = '#7008E7';

export function HomeBrandFooter() {
  return (
    <View style={styles.brand}>
      <Text style={styles.watermark}>
        {'Institute for\nIndustrial\nDevelopment'}
      </Text>
    </View>
  );
}

export function ExpertWorkshopBanner() {
  return (
    <Pressable
      style={styles.banner}
      onPress={() =>
        Alert.alert('Expert Workshop', 'Joining the upcoming workshop (demo).')
      }
      accessibilityRole="button"
      accessibilityLabel='Stay tuned for the upcoming "Expert Workshop", Join'>
      <Image
        source={images.iconExpertWorkshop}
        style={styles.bannerIcon}
        resizeMode="contain"
      />
      <Text style={styles.bannerText} numberOfLines={1}>
        Stay tuned for the upcoming{' '}
        <Text style={styles.bannerEm}>“Expert Workshop”</Text>
      </Text>
      <Text style={styles.join}>JOIN</Text>
      <Image source={images.iconSchemeMore} style={styles.bannerIcon} resizeMode="contain" />
      {/* <Text style={styles.joinChevron}>{'>'}</Text> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  brand: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.spacing_8,
    paddingTop: spacing.spacing_12,
    paddingBottom: spacing.spacing_15,
  },
  watermark: {
    fontFamily: FONT_FAMILY.ARCHIVO_BOLD,
    fontSize: 36,
    lineHeight: 42,
    color: WATERMARK,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BANNER_START,
    experimental_backgroundImage: `linear-gradient(to right, ${BANNER_START} 0%, ${BANNER_END} 100%)`,
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_4,
    gap: spacing.spacing_3,
  },
  bannerIcon: {
    width: 16,
    height: 24,
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
  join: {
    ...fontStyles.body.bold.body_3,
    color: colors.white,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.4,
  },
  joinChevron: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 16,
    fontFamily: FONT_FAMILY.ARCHIVO_BOLD,
    marginLeft: -2,
  },
});
