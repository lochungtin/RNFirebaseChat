import firebase from 'firebase';
import { LogBox } from 'react-native';
import { apiKey } from '../data/secrets';

LogBox.ignoreLogs(['Setting a timer']);

let config: Object = {
    apiKey,
    appId: '1:328777899135:web:72776640390492ff7eb34a',
    authDomain: 'rnfirebasechat-65ad9.firebaseapp.com',
    databaseURL: 'https://rnfirebasechat-65ad9-default-rtdb.europe-west1.firebasedatabase.app',
    measurementId: 'G-SPY4BT88D0',
    messagingSenderId: '328777899135',
    projectId: 'rnfirebasechat-65ad9',
    storageBucket: 'rnfirebasechat-65ad9.appspot.com',
};

firebase.initializeApp(config);

export default firebase;
