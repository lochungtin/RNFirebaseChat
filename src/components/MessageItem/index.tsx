import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { theme } from '../../data/color';
import { MessageType } from '../../types';
import { MessageItemStyles } from './styles';

interface ItemProps {
    message: MessageType,
}

export default class MessageItem extends React.Component<ItemProps> {
    render() {
        return (
            <View style={{ ...MessageItemStyles.positioner, alignItems: this.props.message.isSender ? 'flex-end' : 'flex-start' }}>
                <View style={{ ...MessageItemStyles.rootContainer, backgroundColor: this.props.message.isSender ? theme.messageBgC : theme.accent }}>
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