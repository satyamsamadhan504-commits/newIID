import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components/common/Header';
import {colors, fontStyles, spacing} from '../../module/style-guide';

export function SettingsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Settings" />
      <View style={styles.content}>
        <Text
          style={[fontStyles.body.regular.body_1, {color: colors.text_secondary}]}>
          Settings UI will be added later.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.spacing_10,
  },
});
