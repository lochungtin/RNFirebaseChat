import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SeparatorLine from '../SeparatorLine';

import { theme } from '../../data/color';
import { ContactItemStyles } from './styles';

import { ContactType, MessageType } from '../../types';

interface ItemProps {
    contact: ContactType,
    message: MessageType | undefined,
    onPress: () => void,
    onPressPic: () => void,
}

const tempPfp = (
    <View style={{
        alignItems: 'center',
        backgroundColor: theme.accentFade,
        borderRadius: 27.5,
        display: 'flex',
        height: 55,
        justifyContent: 'center',
        width: 55,
    }}>
        <Icon
            color={theme.textLightC}
            name='account'
            size={40}
        />
    </View>
);

export default class ContactItem extends React.Component<ItemProps> {
    render() {
        let message: string = '';
        if (this.props.message) {
            message = this.props.message.isSender ? 'You' : this.props.contact.displayName;
            message += `: ${this.props.message.content}`;

            if (message.length > 32)
                message = message.substring(0, 32) + '...';
        }

        return (
            <>
                <TouchableOpacity onPress={this.props.onPress} style={ContactItemStyles.rootContainer}>
                    <TouchableOpacity onPress={this.props.onPressPic} style={ContactItemStyles.pfpContainer}>
                        {tempPfp}
                    </TouchableOpacity>
                    <View style={ContactItemStyles.rootTextContainer}>
                        <Text style={{ ...ContactItemStyles.displayNameText, color: theme.textC }}>
                            {this.props.contact.displayName}
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
