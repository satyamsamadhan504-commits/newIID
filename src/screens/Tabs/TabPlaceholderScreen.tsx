import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {EmptyState} from '../../components/common/EmptyState';
import {colors} from '../../module/style-guide';

type TabPlaceholderScreenProps = {
  title: string;
  message: string;
};

export function TabPlaceholderScreen({
  title,
  message,
}: TabPlaceholderScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <EmptyState title={title} message={message} />
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
  },
});
