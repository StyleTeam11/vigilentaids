import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.swp.vigilent',
  appName: 'VigilantAids',
  webDir: 'build',
  server: {
    url: 'http://172.16.12.156:3000',
    cleartext:true
  }
};

export default config;
