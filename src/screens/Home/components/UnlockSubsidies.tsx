import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {images} from '../../../assets/images';
import type {MainTabParamList} from '../../../navigation/types';
import {colors, fontStyles, radius, spacing} from '../../../module/style-guide';
import {noop} from '../../../utils';

const SCHEMES = [
  {key: 'central', label: 'Central\nSchemes', icon: images.iconSchemeNabard},
  {key: 'nabard', label: 'Nabard\nSchemes', icon:  images.iconSchemeCentral},
  {key: 'up', label: 'UP\nSchemes', icon: images.iconSchemeUp},
  {key: 'more', label: 'More\nSchemes', icon: images.iconSchemeMore},
] as const;

export function UnlockSubsidies() {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabParamList, 'HomeTab'>>();

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Unlock Subsidies & Financing</Text>
        <Pressable
          onPress={() => navigation.navigate('Schemes')}
          accessibilityRole="button">
          <Text style={styles.more}>More  ›</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        {SCHEMES.map(item => (
          <Pressable
            key={item.key}
            style={styles.item}
            onPress={
              item.key === 'more'
                ? () => navigation.navigate('Schemes')
                : noop
            }
            accessibilityRole="button"
            accessibilityLabel={item.label.replace('\n', ' ')}>
            <View style={styles.iconWrap}>
              <Image source={item.icon} style={styles.icon} resizeMode="contain" />
            </View>
            <Text style={styles.label}>{item.label}</Text>
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
    paddingBottom: spacing.spacing_10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.spacing_9,
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
  row: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.input_accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.spacing_5,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: colors.white,
  },
  label: {
    ...fontStyles.body.medium.body_4,
    color: colors.text,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
  },
});
