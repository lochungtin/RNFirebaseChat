import { combineReducers } from 'redux';
import { ContactMap, ContactType, ReduxAccountType, ReduxActionType } from '../types';
import { ActionName } from './action';

const defaultAccountState: ReduxAccountType = {
    firebase: null,
    info: null,
};
const updateAccount = (accountState = defaultAccountState, action: ReduxActionType) => {
    let update = { ...accountState };

    switch (action.type) {
        case ActionName.LOGIN:
            update.firebase = action.payload;
            return update;
        case ActionName.LOGOUT:
            return defaultAccountState;
        case ActionName.UPDATE_ACCOUNT_INFO:
            update.info = action.payload;
            return update;
        default:
            return accountState;
    }
}

const defaultContactState: ContactMap = {};
const updateContacts = (contactState = defaultContactState, action: ReduxActionType) => 
    action.type === ActionName.SET_CONTACT_LIST ? action.payload : contactState;

export default combineReducers({
    account: updateAccount,
    contacts: updateContacts,
});
