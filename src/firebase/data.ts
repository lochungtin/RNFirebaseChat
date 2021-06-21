import moment from 'moment';
import { showMessage } from 'react-native-flash-message';

import firebaseConfig from './config';

import { theme } from '../data/color';
import { AccountInfoType, MessageType } from '../types';
import { cidKeyGen } from '../utils/channelIDKeyGen';

const db: firebaseConfig.database.Database = firebaseConfig.database();

// error callback
export const firebaseDefaultErrorCallback = (err: Error | null) => {
    if (err)
        showMessage({
            backgroundColor: theme.accent,
            color: theme.textC,
            description: err.toString(),
            message: 'There was an error accessing cloud storage',
        });
}

// account related actions
export const firebaseFetchAccInfo = async (uid: string) =>
    db
        .ref(`/UserData/${uid}/accountInfo/`)
        .once('value')
        .then((snapshot: firebaseConfig.database.DataSnapshot) => snapshot.val());

export const firebaseSetAccInfo = (uid: string, payload: AccountInfoType, callback: ((err: Error | null) => any) = firebaseDefaultErrorCallback) =>
    db
        .ref(`/UserData/${uid}/accountInfo/`)
        .set(payload, callback);

// contacts and friends related actions
export const firebaseFetchContacts = async (uid: string, callback: (response: firebaseConfig.database.DataSnapshot) => void) => {
    let ref = db.ref(`/UserData/${uid}/contacts/`);
    ref.off();
    ref.on('value', callback);
}

export const firebaseAddFriends = (partyA: string, partyB: string, callback: ((err: Error | null) => any) = firebaseDefaultErrorCallback) => {
    let update: any = {};

    update[`/UserData/${partyA}/contacts/${partyB}`] = '';
    update[`/UserData/${partyB}/contacts/${partyA}`] = '';

    db
        .ref()
        .update(update, callback);
}

export const firebaseRemoveFriend = (partyA: string, partyB: string, callback: ((err: Error | null) => any) = firebaseDefaultErrorCallback) => {
    let update: any = {};

    // delete contact
    update[`/UserData/${partyA}/contacts/${partyB}`] = null;
    update[`/UserData/${partyB}/contacts/${partyA}`] = null;

    // delete chat
    update[`/UserData/${cidKeyGen(partyA, partyB)}`] = null;

    db
        .ref()
        .update(update, callback);
}

// message related actions
export const firebaseFetchLastMessage = async (cid: string) =>
    db
        .ref(`/Messages/${cid}/`)
        .orderByKey()
        .limitToLast(1)
        .get()
        .then((snapshot: firebaseConfig.database.DataSnapshot) => snapshot.val());

export const firebaseClearChat = (partyA: string, partyB: string, callback: ((err: Error | null) => any) = firebaseDefaultErrorCallback) => 
    db.ref(`/UserData/${cidKeyGen(partyA, partyB)}`).set(null, callback);

export const firebasePushMessage = (sender: string, cid: string, content: string, callback: ((err: Error | null) => any) = firebaseDefaultErrorCallback) => {
    let timestamp: number = moment().toDate().getTime();    

    db.ref(`/Messages/${cid}/${timestamp}`).set({
        timestamp,
        content,
        sender,
    });
}
