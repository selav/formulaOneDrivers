// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { DriversListComponent } from 'src/app/drivers-list/drivers-list.component';

export const environment = {
  production: false,
  driversApi: 'http://localhost:3000',
  google_api_client_id: '693782710363-blmmg53i657mehoveraaomfmb7c97n2u.apps.googleusercontent.com' 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
