import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fontStyles, spacing} from '../../../module/style-guide';

type HeaderProps = {
  title: string;
};

export function Header({title}: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={fontStyles.headings.heading_4}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 56,
    paddingHorizontal: spacing.spacing_8,
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
});
