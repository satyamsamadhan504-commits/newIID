import React, {type ReactNode} from 'react';
import {StyleSheet, View, type ViewProps} from 'react-native';
import {colors, radius, spacing} from '../../../module/style-guide';

type CardProps = ViewProps & {
  children: ReactNode;
};

export function Card({children, style, ...rest}: CardProps) {
  return (
    <View {...rest} style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.radius_3,
    padding: spacing.spacing_8,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
