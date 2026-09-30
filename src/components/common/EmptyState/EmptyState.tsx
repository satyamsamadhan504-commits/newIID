import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fontStyles, spacing} from '../../../module/style-guide';

type EmptyStateProps = {
  title: string;
  message?: string;
};

export function EmptyState({title, message}: EmptyStateProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={[fontStyles.headings.heading_4, styles.center]}>
        {title}
      </Text>
      {message ? (
        <Text
          style={[
            fontStyles.body.regular.body_2,
            styles.center,
            {color: colors.text_secondary},
          ]}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: spacing.spacing_11,
    alignItems: 'center',
    gap: spacing.spacing_4,
  },
  center: {
    textAlign: 'center',
  },
});
