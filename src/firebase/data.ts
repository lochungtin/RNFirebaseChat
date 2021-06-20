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

export const firebaseFetchAccInfo = async (uid: string) =>
    db
        .ref(`/UserData/${uid}/accountInfo/`)
        .once('value')
        .then((snapshot: firebaseConfig.database.DataSnapshot) => snapshot.val());

export const firebaseFetchContacts = async (uid: string, callback: (response: firebaseConfig.database.DataSnapshot) => void) => {
    let ref = db.ref(`/UserData/${uid}/contacts/`);
    ref.off();
    ref.on('value', callback);
}

export const firebaseSetAccInfo = (uid: string, payload: AccountInfoType, callback: ((err: Error | null) => any) = firebaseDefaultErrorCallback) =>
    db
        .ref(`/UserData/${uid}/accountInfo/`)
        .set(payload, callback);

export const firebaseAddFriends = (partyA: string, partyB: string, callback: ((err: Error | null) => any) = firebaseDefaultErrorCallback) => {
    let update: any = {};

    update[`/UserData/${partyA}/contacts/${partyB}`] = '';
    update[`/UserData/${partyB}/contacts/${partyA}`] = '';

    db.ref().update(update, callback);
}

export const firebaseFetchMsgInfo = async (uid: string, mid: string) =>
    db
        .ref(`/UserData/${uid}/messages/${mid}`)
        .once('value')
        .then((snapshot: firebaseConfig.database.DataSnapshot) => snapshot.val());
