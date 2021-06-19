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
    displayName: string,
    bio: string,
}

export interface ReduxAccountType {
    firebase: FirebaseAccountType | null,
    info: AccountInfoType | null,
}

// theme type
export interface ThemeType {
    accent: string,
    accentFade: string,
    accountInputBgC: string,
    backgroundC: string,
    separatorC: string,
    textC: string,
    textDisabledC: string,
    textLightC: string,
}

// contact type
export interface ContactType {
    displayName: string,
    lastMessage: MessageType,
    pinned: boolean,
    uid: string,
}

export interface ContactMap {
    [key: string]: ContactType,
}

// message type
export interface MessageType {
    isSender: boolean,
    content: string,
    timestamp: number,
}
