import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {colors, fontStyles, radius, spacing} from '../../../module/style-guide';
import type {ButtonVariant} from '../../../types';

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  title: string;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  variant = 'primary',
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const isSecondary = variant === 'secondary';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
      style={({pressed}) => [
        styles.base,
        isSecondary ? styles.secondary : styles.primary,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      {...rest}>
      <Text
        style={[
          fontStyles.body.bold.body_1,
          {
            textAlign: 'center',
            color: disabled
              ? colors.disabled_text
              : isSecondary
                ? colors.primary
                : colors.white,
          },
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: radius.radius_3,
    paddingHorizontal: spacing.spacing_10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    backgroundColor: colors.disabled_background,
  },
});
