import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
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
