import { showMessage } from 'react-native-flash-message';
import { theme } from '../data/color';
import { AccountInfoType } from '../types';

import firebaseConfig from './config';

const db: firebaseConfig.database.Database = firebaseConfig.database();

export const firebaseDefaultErrorCallback = (err: Error | null) => {
    if (err)
        showMessage({
            backgroundColor: theme.accent,
            color: theme.textC,
            description: err.toString(),
            message: 'There was an error accessing cloud storage',
        });
}


export const firebaseSetAccInfo = (uid: string, payload: AccountInfoType, callback: ((err: Error | null) => any) = firebaseDefaultErrorCallback) =>
    db
        .ref(`/UserData/${uid}/accountInfo/`)
        .set(payload, callback);

export const firebaseFetchAccInfo = async (uid: string) =>
    db
        .ref(`/UserData/${uid}/accountInfo/`)
        .once('value')
        .then((snapshot: firebaseConfig.database.DataSnapshot) => snapshot.val());