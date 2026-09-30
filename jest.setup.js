/* eslint-env jest */

jest.mock('react-native-screens', () => {
  const {View} = require('react-native');

  return {
    enableScreens: jest.fn(),
    screensEnabled: () => true,
    Screen: View,
    ScreenContainer: View,
    NativeScreen: View,
    NativeScreenContainer: View,
    FullWindowOverlay: View,
    ScreenStack: View,
    ScreenStackHeaderConfig: View,
  };
});
