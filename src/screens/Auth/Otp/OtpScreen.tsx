import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../../assets/images';
import {Button} from '../../../components/common/Button';
import {APP_TAGLINE, OTP_LENGTH, OTP_RESEND_SECONDS} from '../../../constants';
import type {RootStackParamList} from '../../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../../module/style-guide';
import {noop} from '../../../utils';

const heroHeight = Math.round(Dimensions.get('window').height * 0.46);

export function OtpScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Otp'>>();
  const {params} = useRoute<RouteProp<RootStackParamList, 'Otp'>>();
  const otpInputRef = useRef<React.ComponentRef<typeof TextInput>>(null);

  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(OTP_RESEND_SECONDS);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const isKeyboardVisible = keyboardHeight > 0;
  const canContinue = otp.length === OTP_LENGTH;
  const canResend = secondsLeft === 0;
  const digits = Array.from(
    {length: OTP_LENGTH},
    (_, index) => otp[index] ?? '',
  );
  const timerLabel = `0:${String(secondsLeft).padStart(2, '0')}`;

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

  useFocusEffect(
    React.useCallback(() => {
      const focusOtp = () => otpInputRef.current?.focus();
      const first = setTimeout(focusOtp, 80);
      const retry = setTimeout(focusOtp, 350);
      return () => {
        clearTimeout(first);
        clearTimeout(retry);
      };
    }, []),
  );

  useEffect(() => {
    if (secondsLeft === 0) {
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(current => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  function handleOtpChange(value: string) {
    setOtp(value.replace(/\D/g, '').slice(0, OTP_LENGTH));
  }

  function handleResend() {
    if (!canResend) {
      return;
    }

    setOtp('');
    setSecondsLeft(OTP_RESEND_SECONDS);
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.hero, isKeyboardVisible && styles.heroCompact]}>
        <Image
          source={images.otpHero}
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
            Enter the 4-digit code{'\n'}sent to your at {params.mobileNumber}
          </Text>

          <View style={styles.form}>
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={8}
              accessibilityRole="button">
              <Text
                style={[
                  fontStyles.body.regular.body_2,
                  {color: colors.input_accent},
                ]}>
                want to change your mobile number? ✎
              </Text>
            </Pressable>

            <View style={styles.otpField}>
              <View style={styles.otpRow} pointerEvents="none">
                {digits.map((digit, index) => (
                  <View key={index} style={styles.otpBox}>
                    <Text
                      style={[fontStyles.headings.heading_3, styles.otpDigit]}>
                      {digit}
                    </Text>
                  </View>
                ))}
              </View>
              <TextInput
                ref={otpInputRef}
                value={otp}
                onChangeText={handleOtpChange}
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={OTP_LENGTH}
                autoFocus
                showSoftInputOnFocus
                caretHidden
                contextMenuHidden
                importantForAutofill="yes"
                autoComplete="sms-otp"
                textContentType="oneTimeCode"
                onPressIn={() => otpInputRef.current?.focus()}
                underlineColorAndroid="transparent"
                accessibilityLabel="OTP code"
                style={styles.otpInput}
              />
            </View>

            <Pressable
              onPress={handleResend}
              disabled={!canResend}
              style={styles.resend}
              accessibilityRole="button">
              <Text
                style={[
                  fontStyles.body.regular.body_2,
                  {
                    textAlign: 'center',
                    color: canResend
                      ? colors.input_accent
                      : colors.disabled_text,
                  },
                ]}>
                {canResend
                  ? '↻  Resend code by SMS'
                  : `↻  Resend code by SMS (${timerLabel})`}
              </Text>
            </Pressable>

            <Button
              title="Continue"
              disabled={!canContinue}
              onPress={() => navigation.navigate('userDetails')}
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
    height: Math.round(heroHeight * 0.45),
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
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
    gap: spacing.spacing_10,
  },
  heading: {
    fontSize: 22,
    lineHeight: 34,
  },
  form: {
    gap: spacing.spacing_10,
  },
  otpField: {
    position: 'relative',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.spacing_4,
  },
  otpBox: {
    flex: 1,
    height: 60,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.radius_3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  otpDigit: {
    textAlign: 'center',
  },
  otpInput: {
    ...StyleSheet.absoluteFill,
    color: 'transparent',
    fontSize: 1,
  },
  resend: {
    alignSelf: 'center',
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
