import { MessageType } from "react-native-flash-message";
import { AccountInfoType, ContactMap, ContactType, FirebaseAccountType } from "../types";

export enum ActionName {
    LOGIN,
    LOGOUT,
    SET_CONTACT_LIST,
    SET_LAST_MESSAGE,
    UPDATE_ACCOUNT_INFO,
}

export const login = (payload: FirebaseAccountType) => ({
    type: ActionName.LOGIN,
    payload,
});

export const logout = () => ({
    type: ActionName.LOGOUT,
});

export const setContactList = (payload: ContactMap) => ({
    type: ActionName.SET_CONTACT_LIST,
    payload,
});

export const setLastMessage = (payload: {uid: string, message: MessageType}) => ({
    type: ActionName.SET_LAST_MESSAGE,
    payload,
});

export const updateAccInfo = (payload: AccountInfoType) => ({
    type: ActionName.UPDATE_ACCOUNT_INFO,
    payload,
});
