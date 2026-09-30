const path = require('path');
const {getDefaultConfig} = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);
const nanoidNonSecure = path.resolve(
  __dirname,
  'node_modules/nanoid/non-secure/index.js',
);

if (!config.resolver.sourceExts.includes('cjs')) {
  config.resolver.sourceExts.push('cjs');
}

const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'nanoid/non-secure') {
    return {
      type: 'sourceFile',
      filePath: nanoidNonSecure,
    };
  }

  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
