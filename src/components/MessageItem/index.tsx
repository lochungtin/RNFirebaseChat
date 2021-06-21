import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';

import { theme } from '../../data/color';
import { MessageItemStyles } from './styles';

import { MessageType, ReduxAccountType } from '../../types';
import { connect } from 'react-redux';

interface ItemProps {
    message: MessageType,
}

interface ReduxProps {
    account: ReduxAccountType,
}

class MessageItem extends React.Component<ReduxProps & ItemProps> {
    render() {
        let isSender: boolean = this.props.account.firebase?.uid === this.props.message.sender;

        return (
            <View style={{ ...MessageItemStyles.positioner, alignItems: isSender ? 'flex-end' : 'flex-start' }}>
                <View style={{ ...MessageItemStyles.rootContainer, backgroundColor: isSender ? theme.messageBgC : theme.accent }}>
                    <Text style={{ ...MessageItemStyles.contentText, color: theme.textC }}>
                        {this.props.message.content}
                    </Text>
                </View>
                <Text style={{ ...MessageItemStyles.timestampText, color: theme.textDisabledC }}>
                    {moment(this.props.message.timestamp).format('DD-MM-YYYY HH:mm')}
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    account: state.account,
});

export default connect(mapStateToProps)(MessageItem);
