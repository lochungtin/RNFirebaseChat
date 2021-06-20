import { showMessage } from 'react-native-flash-message';
import { theme } from '../data/color';
import { AccountInfoType, ContactType } from '../types';

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

export const firebaseAddFriends = (partyA: ContactType, partyB: ContactType, callback: ((err: Error | null) => any) = firebaseDefaultErrorCallback) => {
    let update: any = {};

    update[`/UserData/${partyA.uid}/contacts/${partyB.uid}`] = partyB;
    update[`/UserData/${partyB.uid}/contacts/${partyA.uid}`] = partyA;

    db.ref().update(update, callback);
}
