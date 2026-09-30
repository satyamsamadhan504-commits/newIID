import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {colors, spacing} from '../../../module/style-guide';

type LoaderProps = {
  size?: 'small' | 'large';
};

export function Loader({size = 'large'}: LoaderProps) {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size={size} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: spacing.spacing_8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
