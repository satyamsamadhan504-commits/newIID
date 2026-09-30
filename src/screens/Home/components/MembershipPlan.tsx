import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {images} from '../../../assets/images';
import type {RootStackParamList} from '../../../navigation/types';
import {colors, fontStyles, radius, spacing} from '../../../module/style-guide';

export function MembershipPlan() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>Membership Plan</Text>
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('MembershipPlanDetails')}
        accessibilityRole="button"
        accessibilityLabel="Choose your growth plan. Explore Membership">
        <Image
          source={images.membershipWing}
          style={styles.wing}
          resizeMode="contain"
          pointerEvents="none"
        />
        <Image
          source={images.membershipGlitter}
          style={styles.glitter}
          resizeMode="cover"
          pointerEvents="none"
        />
        <View style={styles.copy}>
          <Text style={styles.title}>Choose your growth plan</Text>
          <Text style={styles.subtitle}>
            Flexible plans designed for every entrepreneurial stage — from first
            idea to full-scale industry.
          </Text>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Explore Membership</Text>
          </View>
        </View>
        <Image
          source={images.membershipKing}
          style={styles.king}
          resizeMode="contain"
          pointerEvents="none"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.spacing_2,
  },
  heading: {
    ...fontStyles.headings.heading_4,
    color: colors.text,
    marginBottom: spacing.spacing_6,
  },
  card: {
    borderRadius: radius.radius_4,
    overflow: 'hidden',
    minHeight: 156,
    backgroundColor: '#3E1D0C',
    experimental_backgroundImage:
      'radial-gradient(circle at 8% 0%, rgba(232, 168, 84, 0.55) 0%, rgba(152, 83, 28, 0.2) 34%, transparent 58%), linear-gradient(to right, #C4893A 0%, #98531C 38%, #3E1D0C 100%)',
    paddingLeft: spacing.spacing_8,
    paddingTop: spacing.spacing_8,
    paddingBottom: spacing.spacing_7,
    paddingRight: 100,
    justifyContent: 'center',
  },
  wing: {
    position: 'absolute',
    width: 210,
    height: 210,
    left: -78,
    top: -108,
    opacity: 0.6,
    zIndex: 1,
  },
  glitter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '78%',
    opacity: 0.7,
    zIndex: 1,
    transform: [{rotate: '-4deg'}],
  },
  copy: {
    zIndex: 2,
  },
  title: {
    ...fontStyles.headings.heading_5,
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.spacing_2,
  },
  subtitle: {
    ...fontStyles.body.regular.body_5,
    color: 'rgba(255,255,255,0.88)',
    lineHeight: 16,
    marginBottom: spacing.spacing_6,
    fontSize: 10,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF4B19',
    experimental_backgroundImage:
      'linear-gradient(to right, #FF4B19 0%, #FF7E0E 100%)',
    borderRadius: radius.radius_full,
    paddingHorizontal: spacing.spacing_7,
    paddingVertical: spacing.spacing_4,
  },
  buttonText: {
    ...fontStyles.body.bold.body_3,
    color: colors.white,
    fontSize: 12,
    lineHeight: 16,
  },
  king: {
    position: 'absolute',
    right: -10,
    bottom: 5,
    width: 132,
    height: 140,
    zIndex: 3,
    transform: [{rotate: '18deg'}],
  },
});
