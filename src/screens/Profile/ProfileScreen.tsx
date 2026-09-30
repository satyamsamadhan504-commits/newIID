import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../components/common/Header';
import {EmptyState} from '../../components/common/EmptyState';
import {colors, fontStyles, spacing} from '../../module/style-guide';

export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Profile" />
      <View style={styles.content}>
        <EmptyState
          title="Profile"
          message="This screen will show account details later."
        />
        <Text
          style={[
            fontStyles.body.regular.body_2,
            {color: colors.text_secondary, textAlign: 'center'},
          ]}>
          UI placeholder only
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
    justifyContent: 'center',
    padding: spacing.spacing_10,
  },
});
