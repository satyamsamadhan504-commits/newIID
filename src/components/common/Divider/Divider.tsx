import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, spacing} from '../../../module/style-guide';

type DividerProps = {
  spacingSize?: number;
};

export function Divider({spacingSize = spacing.spacing_8}: DividerProps) {
  return <View style={[styles.line, {marginVertical: spacingSize}]} />;
}

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});
