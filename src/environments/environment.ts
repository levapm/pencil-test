import { NgxLoggerLevel } from 'ngx-logger';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF,
  firebase:  {
    apiKey: 'AIzaSyCH2IwmdsAetSLmd9p3u9eetvzTvRk0n4g',
    authDomain: 'pencil-code-test-35c68.firebaseapp.com',
    databaseURL: 'https://pencil-code-test-35c68-default-rtdb.firebaseio.com',
    projectId: 'pencil-code-test-35c68',
    storageBucket: 'pencil-code-test-35c68.appspot.com',
    messagingSenderId: '939709511333',
    appId: '1:939709511333:web:6a677407f2ced294f9bf4c'
  }
};
