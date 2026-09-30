import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import {colors, fontStyles, radius, spacing} from '../../../module/style-guide';

type InputProps = TextInputProps & {
  label: string;
};

export function Input({label, style, ...rest}: InputProps) {
  return (
    <View style={styles.wrapper}>
      <Text
        style={[
          fontStyles.body.regular.body_2,
          {color: colors.text_secondary},
        ]}>
        {label}
      </Text>
      <TextInput
        {...rest}
        accessibilityLabel={label}
        placeholderTextColor={colors.text_secondary}
        style={[styles.input, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.spacing_2,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.radius_3,
    paddingHorizontal: spacing.spacing_8,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: fontStyles.body.regular.body_1.fontSize,
  },
});
