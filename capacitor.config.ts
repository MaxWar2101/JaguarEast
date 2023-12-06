import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dadm.ionic.jaguareats',
  appName: 'JaguarEats',
  webDir: 'www',

  server: {
    androidScheme: "http",
    cleartext: true,
    allowNavigation: [
      "http://jaguareats.atwebpages.com/*"
    ]
  }
  // server: {
  //   androidScheme: ['http', 'https'],
  //   cleartext: true,
  //   allowNavigation: ["http://jaguareats.atwebpages.com/*"]
  // }
};

export default config;
