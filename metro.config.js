const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// expo-sqlite on web needs wasm files to be treated as assets.
if (!config.resolver.assetExts.includes('wasm')) {
  config.resolver.assetExts.push('wasm');
}

// expo-sqlite on web needs cross-origin isolation (SharedArrayBuffer).
// Metro's enhanceMiddleware only covers bundle requests, so the headers are
// injected for every HTML response the dev server returns, including the
// index.html that Expo serves through its own manifest middleware.
const http = require('node:http');
const originalSetHeader = http.ServerResponse.prototype.setHeader;
http.ServerResponse.prototype.setHeader = function setHeader(name, value) {
  if (
    String(name).toLowerCase() === 'content-type' &&
    String(value).toLowerCase().includes('text/html') &&
    !this.hasHeader('Cross-Origin-Embedder-Policy')
  ) {
    originalSetHeader.call(this, 'Cross-Origin-Opener-Policy', 'same-origin');
    originalSetHeader.call(this, 'Cross-Origin-Embedder-Policy', 'credentialless');
  }
  return originalSetHeader.call(this, name, value);
};

config.server.enhanceMiddleware = (metroMiddleware) => {
  return (req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    return metroMiddleware(req, res, next);
  };
};

module.exports = config;
