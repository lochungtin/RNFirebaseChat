// redux type
export interface ReduxActionType {
    type: number,
    payload?: any,
}

// account type
export interface FirebaseAccountType {
    email: string,
    uid: string,
}

export interface AccountInfoType {
    diplayName: string,
    bio: string,
}

export interface ReduxAccountType {
    firebase: FirebaseAccountType | null,
    info: AccountInfoType | null,
}

// theme type
export interface ThemeType {
    accent: string,
    accountInputBgC: string,
    backgroundC: string,
    separatorC: string,
    textC: string,
    textDisabledC: string,
}
