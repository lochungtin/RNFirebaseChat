import { AccountInfoType, ContactType, FirebaseAccountType } from "../types";

export enum ActionName {
    ADD_CONTACT,
    LOGIN,
    LOGOUT,
    REMOVE_CONTACT,
    UPDATE_ACCOUNT_INFO,
}

export const addContact = (payload: ContactType) => ({
    type: ActionName.ADD_CONTACT,
    payload,
});

export const login = (payload: FirebaseAccountType) => ({
    type: ActionName.LOGIN,
    payload,
});

export const logout = () => ({
    type: ActionName.LOGOUT,
});

export const removeContact = (payload: string) => ({
    type: ActionName.REMOVE_CONTACT,
    payload,
});

export const updateAccInfo = (payload: AccountInfoType) => ({
    type: ActionName.UPDATE_ACCOUNT_INFO,
    payload,
});
