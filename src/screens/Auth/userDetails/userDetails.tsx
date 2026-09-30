import React, {useEffect, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../../assets/images';
import {Button} from '../../../components/common/Button';
import {APP_TAGLINE} from '../../../constants';
import type {RootStackParamList} from '../../../navigation/types';
import {
  colors,
  fontStyles,
  radius,
  spacing,
} from '../../../module/style-guide';
import {noop} from '../../../utils';

const heroHeight = Math.round(Dimensions.get('window').height * 0.48);

export function UserDetailsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'userDetails'>>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const isKeyboardVisible = keyboardHeight > 0;
  const canConfirm = fullName.trim().length > 0;
  const isEmailActive = isEmailFocused || email.length > 0;

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

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.hero, isKeyboardVisible && styles.heroCompact]}>
        <Image
          source={images.userDetailsHero}
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
          <Text style={[fontStyles.headings.heading_4, styles.heading]}>
            Welcome to Institute{'\n'}for Industrial Development
          </Text>

          <View style={styles.form}>
            <View style={[styles.field, styles.fieldActive]}>
              <View style={styles.labelChip}>
                <Text
                  style={[
                    fontStyles.body.regular.body_2,
                    {color: colors.input_accent},
                    styles.label,
                  ]}>
                  Full Name
                </Text>
              </View>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter Your Full Name"
                placeholderTextColor={colors.disabled_text}
                autoCapitalize="words"
                accessibilityLabel="Full Name"
                style={styles.input}
              />
            </View>

            <View
              style={[styles.field, isEmailActive && styles.fieldActive]}>
              <View style={styles.labelChip}>
                <Text
                  style={[
                    fontStyles.body.regular.body_2,
                    {
                      color: isEmailActive
                        ? colors.input_accent
                        : colors.disabled_text,
                    },
                    styles.label,
                  ]}>
                  Email (Optional)
                </Text>
              </View>
              <TextInput
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                placeholder="abc@xyz.com"
                placeholderTextColor={colors.disabled_text}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="Email Optional"
                style={styles.input}
              />
            </View>

            <Button
              title="Confirm Details"
              disabled={!canConfirm}
              onPress={() => navigation.navigate('Home')}
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
    lineHeight: 30,
  },
  form: {
    gap: spacing.spacing_10,
  },
  field: {
    borderWidth: 0.8,
    borderColor: colors.border,
    borderRadius: radius.radius_4,
    paddingHorizontal: spacing.spacing_8,
    paddingVertical: 6,
    backgroundColor: colors.surface,
  },
  fieldActive: {
    borderColor: colors.input_accent,
  },
  labelChip: {
    position: 'absolute',
    top: -12,
    left: spacing.spacing_8,
    paddingHorizontal: spacing.spacing_2,
    backgroundColor: colors.surface,
  },
  label: {
    fontSize: 12,
    lineHeight: 20,
  },
  input: {
    minHeight: 48,
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
