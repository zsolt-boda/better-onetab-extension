import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'better.onetab.extension',
  appName: 'Better OneTab',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
