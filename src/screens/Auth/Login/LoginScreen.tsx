import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../../assets/images';
import { Button } from '../../../components/common/Button';
import {
  APP_TAGLINE,
  COUNTRY_CODE,
  MOBILE_NUMBER_LENGTH,
} from '../../../constants';
import type { RootStackParamList } from '../../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../../module/style-guide';
import { noop } from '../../../utils';

const heroHeight = Math.round(Dimensions.get('window').height * 0.48);

export function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const [mobileNumber, setMobileNumber] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const isKeyboardVisible = keyboardHeight > 0;
  const canGetOtp = mobileNumber.length === MOBILE_NUMBER_LENGTH;

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, event => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  function handleMobileNumberChange(value: string) {
    setMobileNumber(value.replace(/\D/g, '').slice(0, MOBILE_NUMBER_LENGTH));
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.hero, isKeyboardVisible && styles.heroCompact]}>
        <Image
          source={images.loginHero}
          style={styles.heroImage}
          resizeMode="cover"
          accessibilityLabel="IID"
        />
        <SafeAreaView edges={['top']} style={styles.logoWrap}>
          <Image
            source={images.iidLogoLogin}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel={APP_TAGLINE}
          />
        </SafeAreaView>
      </View>

      <View style={styles.sheet}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
          contentContainerStyle={[
            styles.content,
            Platform.OS === 'android' &&
            isKeyboardVisible && {
              paddingBottom: spacing.spacing_11 + keyboardHeight,
            },
          ]}
          bounces={false}>
          <Text style={[fontStyles.headings.heading_3, styles.heading]}>
            Enter your mobile number{'\n'}to get OTP
          </Text>

          <View style={styles.form}>
            <View style={styles.phoneField}>
              <View style={styles.phoneLabelChip}>
                <Text
                  style={[
                    fontStyles.body.regular.body_2,
                    { color: colors.input_accent },
                    styles.phoneLabel,
                  ]}>
                  Mobile Number
                </Text>
              </View>
              <View style={styles.phoneRow}>
                <Text
                  style={[
                    fontStyles.body.regular.body_1,
                    { color: colors.text },
                  ]}>
                  {COUNTRY_CODE}
                </Text>
                <TextInput
                  value={mobileNumber}
                  onChangeText={handleMobileNumberChange}
                  keyboardType="number-pad"
                  maxLength={MOBILE_NUMBER_LENGTH}
                  placeholder="10 digit mobile number"
                  placeholderTextColor={colors.disabled_text}
                  accessibilityLabel="Mobile Number"
                  style={styles.phoneInput}
                />

              </View>
            </View>
            

            <Button
              title="Get OTP"
              disabled={!canGetOtp}
              onPress={() => navigation.navigate('Otp', { mobileNumber })}
              style={styles.button}
            />

            <Text style={styles.legal}>
              By continuing, you agree to our{' '}
              <Text style={styles.legalLink} onPress={noop}>
                terms of service
              </Text>{' '}
              and{' '}
              <Text style={styles.legalLink} onPress={noop}>
                privacy policy
              </Text>
            </Text>
          </View>

          <SafeAreaView edges={['bottom']} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  hero: {
    height: heroHeight,
    backgroundColor: colors.primary,
    overflow: 'hidden',
  },
  heroCompact: {
    height: Math.round(heroHeight * 0.46),
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingLeft: spacing.spacing_8,
    paddingTop: spacing.spacing_4,
  },
  logo: {
    width: 90,
    height: 34,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.spacing_10,
    paddingTop: spacing.spacing_11,
    paddingBottom: spacing.spacing_10,
    gap: spacing.spacing_11,
  },
  heading: {
    fontSize: 22,
    lineHeight: 34,
  },
  form: {
    gap: spacing.spacing_10,
  },
  phoneField: {
    borderWidth: 0.8,
    borderColor: colors.input_accent,
    borderRadius: radius.radius_4,
    paddingHorizontal: spacing.spacing_8,
    paddingVertical: 6,
    backgroundColor: colors.surface,
  },
  phoneLabelChip: {
    position: 'absolute',
    top: -12,
    left: spacing.spacing_8,
    paddingHorizontal: spacing.spacing_2,
    backgroundColor: colors.surface,
  },
  phoneLabel: {
    fontSize: 12,
    lineHeight: 20,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    gap: spacing.spacing_4,
  },
  phoneInput: {
    flex: 1,
    color: colors.text,
    fontSize: fontStyles.body.regular.body_1.fontSize,
    paddingVertical: 0,
  },
  button: {
    borderRadius: 14,
  },
  legal: {
    color: colors.text_secondary,
    fontSize: 10,
    lineHeight: 20,
    textAlign: 'center',
  },
  legalLink: {
    color: colors.link,
    textDecorationLine: 'underline',
  },
});
