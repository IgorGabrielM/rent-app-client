// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


export const environment = {
  production: false,
  firebase: {
    projectId: 'rent-app-d693f',
    appId: '1:1051099167233:web:6ebd83cd0e768abe2ede00',
    storageBucket: 'rent-app-d693f.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyB5CjZgScJxQrsbbfBbNuWIfCI6tfbw_so',
    authDomain: 'rent-app-d693f.firebaseapp.com',
    messagingSenderId: '1051099167233',
    measurementId: 'G-3DRB58ZSVX',
  }
};

initializeApp(environment.firebase)


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
