import { AccountInfoType, FirebaseAccountType } from "../types";

export enum ActionName {
    LOGIN,
    LOGOUT,
    UPDATE_ACCOUNT_INFO,
}

export const login = (payload: FirebaseAccountType) => ({
    type: ActionName.LOGIN,
    payload,
});

export const logout = () => ({
    type: ActionName.LOGOUT,
});

export const updateAccInfo = (payload: AccountInfoType) => ({
    type: ActionName.UPDATE_ACCOUNT_INFO,
    payload,
});
