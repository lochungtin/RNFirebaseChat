import { combineReducers } from 'redux';
import { ReduxAccountType, ReduxActionType } from '../types';
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

export default combineReducers({
    account: updateAccount,
});
