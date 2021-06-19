import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/color';
import { ContactItemStyles } from './styles';

import { ContactType } from '../../types';

interface ItemProps {
    contact: ContactType,
    onPress: () => void,
    onPressPic: () => void,
}

const tempPfp = (
    <View style={{
        alignItems: 'center',
        backgroundColor: theme.accentFade,
        borderRadius: 30,
        display: 'flex',
        height: 60,
        justifyContent: 'center',
        width: 60,
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
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{ ...ContactItemStyles.rootContainer, borderColor: theme.separatorC }}>
                <TouchableOpacity onPress={this.props.onPressPic} style={ContactItemStyles.pfpContainer}>
                    {tempPfp}
                </TouchableOpacity>
                <View style={ContactItemStyles.rootTextContainer}>
                    <Text style={{ ...ContactItemStyles.displayNameText, color: theme.textC }}>
                        {this.props.contact.displayName}
                    </Text>
                    <Text style={{ ...ContactItemStyles.lastMessageText, color: theme.textDisabledC }}>
                        {this.props.contact.lastMessage.content}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}