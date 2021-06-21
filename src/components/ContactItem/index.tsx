import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import SeparatorLine from '../SeparatorLine';

import { theme } from '../../data/color';
import { ContactItemStyles } from './styles';

import firebaseConfig from '../../firebase/config';
import { firebaseFetchAccInfo, firebaseFetchLastMessage } from '../../firebase/data';
import { AccountInfoType, MessageMap, MessageType, ReduxAccountType } from '../../types';
import { cidKeyGen } from '../../utils/channelIDKeyGen';

interface ItemProps {
    onPress: () => void,
    onPressPic: () => void,
    uid: string,
}

interface ReduxProps {
    account: ReduxAccountType,
}

interface ItemState {
    displayName: string,
    lastMessage: MessageType | undefined,
}

class ContactItem extends React.Component<ItemProps & ReduxProps, ItemState> {

    constructor(props: ItemProps & ReduxProps) {
        super(props);
        this.state = {
            displayName: '',
            lastMessage: undefined,
        }

        this.refreshContent();
    }

    refreshContent = () => {
        firebaseFetchAccInfo(this.props.uid, (res: firebaseConfig.database.DataSnapshot) => {
            let account: AccountInfoType = res.val();

            if (account === null)
                return;

            this.setState({ displayName: account.displayName });
        });

        let cid = cidKeyGen(this.props.account.firebase?.uid || '', this.props.uid);
        firebaseFetchLastMessage(cid, (res: firebaseConfig.database.DataSnapshot) => {
            let mMap: MessageMap = res.val();

            console.log(mMap);
            if (mMap === null)
                return;

            this.setState({ lastMessage: mMap[Object.keys(mMap)[0]] });
        });
    }

    render() {
        let message: string = '';
        if (this.state.lastMessage) {
            message = this.state.lastMessage.sender === this.props.account.firebase?.uid ? 'You' : this.state.displayName;
            message += `: ${this.state.lastMessage.content}`;

            if (message.length > 32)
                message = message.substring(0, 32) + '...';
        }

        return (
            <>
                <TouchableOpacity onPress={this.props.onPress} style={ContactItemStyles.rootContainer}>
                    <TouchableOpacity onPress={this.props.onPressPic} style={{ ...ContactItemStyles.pfpContainer, backgroundColor: theme.accentFade }}>
                        <Icon
                            color={theme.textLightC}
                            name='account'
                            size={40}
                        />
                    </TouchableOpacity>
                    <View style={ContactItemStyles.rootTextContainer}>
                        <Text style={{ ...ContactItemStyles.displayNameText, color: theme.textC }}>
                            {this.state.displayName}
                        </Text>
                        <Text style={{ color: theme.textDisabledC }}>
                            {message}
                        </Text>
                    </View>
                </TouchableOpacity>
                <SeparatorLine height={1} width={1} />
            </>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    account: state.account,
});

export default connect(mapStateToProps)(ContactItem);
