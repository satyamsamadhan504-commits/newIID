import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {images} from '../../../assets/images';
import type {RootStackParamList} from '../../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../../module/style-guide';

export function EdpProgramme() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.section}>
      <View style={styles.chip}>
        <Image
          source={images.edpChipBg}
          style={styles.chipImage}
          resizeMode="stretch"
        />
        <Text style={styles.eyebrow}>EDP PROGRAMME</Text>
      </View>

      <View style={styles.card}>
        <Image
          source={images.edpBg}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.copy}>
          <Text style={styles.title}>Entrepreneurship Journey</Text>
          <Text style={styles.subtitle}>
            MSME-certified training programme trusted by{'\n'}
            4,912+ entrepreneurs across India
          </Text>
          <Pressable
            onPress={() => navigation.navigate('EdpProgramme')}
            style={styles.exploreBtn}
            accessibilityRole="button">
            <Text style={styles.exploreText}>Explore EDP</Text>
          </Pressable>
        </View>
        <Image
          source={images.edpPerson}
          style={styles.person}
          resizeMode="contain"
          accessibilityLabel="EDP"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.spacing_2,
  },
  chip: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.spacing_4,
    marginBottom: spacing.spacing_6,
    overflow: 'hidden',
  },
  chipImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  eyebrow: {
    ...fontStyles.body.medium.body_4,
    color: colors.white,
    letterSpacing: 1.6,
    fontSize: 11,
    zIndex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#4B7CF5',
    paddingLeft: spacing.spacing_8,
  },
  cardImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '110%',
    height: '100%',
  },
  copy: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical:2,
    paddingRight: spacing.spacing_4,
    zIndex: 1,
    gap: spacing.spacing_2,
    minHeight: 140,
  },
  title: {
    ...fontStyles.headings.heading_5,
    color: colors.white,
    fontSize: 16,
    lineHeight: 20,
  },
  subtitle: {
    ...fontStyles.body.regular.body_5,
    color: 'rgba(255, 255, 255, 0.88)',
    lineHeight: 16,
  },
  exploreBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: radius.radius_full,
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_2,
    marginTop: spacing.spacing_4,
  },
  exploreText: {
    ...fontStyles.body.bold.body_3,
    color: colors.primary,
    lineHeight: 16,
  },
  person: {
    width: 110,
    height: 110,
    marginRight: 0,
    zIndex: 2,
  },
});
