import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'better.onetab.extension',
  appName: 'better-onetab-extension',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
