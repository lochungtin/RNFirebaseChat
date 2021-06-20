import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/color';
import { AccountInfoItemStyles } from './styles';


interface InfoProps {
    details: string,
    iconName: string,
    onEdit?: () => void,
    title: string,
}

export default class AccountInfoItem extends React.Component<InfoProps> {
    render() {
        return (
            <View style={AccountInfoItemStyles.rootContainer}>
                <Icon
                    color={theme.textDisabledC}
                    name={this.props.iconName}
                    size={30}
                />
                <View style={AccountInfoItemStyles.textContainer}>
                    <Text style={{ ...AccountInfoItemStyles.titleText, color: theme.textDisabledC }}>
                        {this.props.title}
                    </Text>
                    <Text style={{ ...AccountInfoItemStyles.infoText, color: theme.textC }}>
                        {this.props.details}
                    </Text>
                </View>
                {this.props.onEdit ?
                    <TouchableOpacity onPress={this.props.onEdit}>
                        <Icon
                            color={theme.accent}
                            name='pencil'
                            size={25}
                        />
                    </TouchableOpacity>
                    :
                    <Icon
                        color='transparent'
                        name='pencil'
                        size={25}
                    />
                }
            </View>
        );
    }
}
