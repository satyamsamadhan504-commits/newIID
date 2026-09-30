import React, {useEffect} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import {APP_TAGLINE, SPLASH_DURATION_MS} from '../../constants';
import type {RootStackParamList} from '../../navigation/types';
import {colors, fontStyles, spacing} from '../../module/style-guide';

type SplashNavigation = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export function SplashScreen() {
  const navigation = useNavigation<SplashNavigation>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.center}>
        <Image
          source={images.iidLogo}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="IID"
        />
        <Text
          style={[
            fontStyles.body.regular.body_2,
            {color: colors.white, textAlign: 'center'},
            styles.tagline,
          ]}>
          {APP_TAGLINE}
        </Text>
      </View>
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <Image
          source={images.iidLogoFooter}
          style={styles.footerLogo}
          resizeMode="contain"
          accessibilityLabel={APP_TAGLINE}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.spacing_11,
    gap: spacing.spacing_8,
  },
  logo: {
    width: 150,
    height: 80,
    tintColor: colors.white,
  },
  tagline: {
    maxWidth: 150,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.spacing_10,
  },
  footerLogo: {
    width: 140,
    height: 38,
    tintColor: colors.white,
    opacity: 1,
  },
});
// import React from 'react';
// import { View, Text } from 'react-native';
// const SplashScreen = () => {
//   return (
//     <View>
//       <Text>Splash Screen</Text>
//     </View>
//   );
// }
// export default SplashScreen;