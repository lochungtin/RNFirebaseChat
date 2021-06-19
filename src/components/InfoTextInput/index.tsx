import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/color';
import { InfoTextInputStyle } from './styles';

interface TextInputProps {
    hidden?: boolean,
    iconName: string,
    onChangeText?: (text: string) => void,
    onConfirm?: (text: string) => void,
    placeholder: string,
}

export default class InfoTextInput extends React.Component<TextInputProps> {

    state = {
        input: '',
    }

    onChangeText = (input: string) => {
        this.setState({ input });

        if (this.props.onChangeText)
            this.props.onChangeText(input);
    }

    onConfirm = () => {
        this.setState({ input: '' });

        if (this.props.onConfirm)
            this.props.onConfirm(this.state.input)
    }

    render() {
        return (
            <View style={{
                ...InfoTextInputStyle.rootContainer,
                backgroundColor: theme.backgroundC,
                borderColor: theme.accent,
            }}>
                <Icon
                    color={theme.textDisabledC}
                    name={this.props.iconName}
                    size={30}
                />
                <TextInput
                    autoCapitalize='none'
                    autoFocus={true}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={theme.textDisabledC}
                    onChangeText={this.onChangeText}
                    secureTextEntry={this.props.hidden}
                    style={{
                        ...InfoTextInputStyle.textInput,
                        color: theme.textC,
                    }}
                />
                <TouchableOpacity onPress={this.onConfirm}>
                    <Icon
                        color={theme.textDisabledC}
                        name='check'
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}