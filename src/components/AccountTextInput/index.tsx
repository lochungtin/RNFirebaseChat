import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../data/color';
import { AccountTextInputStyle, screenWidth } from './styles';

interface TextInputProps {
    hidden?: boolean,
    iconName: string,
    onChangeText: (text: string) => void,
    onForgot?: () => void,
    placeholder: string,
}

export default class AccountTextInput extends React.Component<TextInputProps> {

    state = {
        input: '',
        focus: false,
    }

    render() {
        return (
            <View style={{
                ...AccountTextInputStyle.rootContainer,
                ...(this.state.focus ? AccountTextInputStyle.textInputFocus : undefined),
                backgroundColor: theme.backgroundC,
                borderColor: theme.separatorC,
            }}>
                <Icon
                    color={this.state.focus ? theme.textC : theme.textDisabledC}
                    name={this.props.iconName}
                    size={30}
                />
                <TextInput
                    autoCapitalize='none'
                    placeholder={this.props.placeholder}
                    placeholderTextColor={theme.textDisabledC}
                    onBlur={() => this.setState({ focus: false })}
                    onChangeText={this.props.onChangeText}
                    onFocus={() => this.setState({ focus: true })}
                    secureTextEntry={this.props.hidden}
                    style={{
                        ...AccountTextInputStyle.textInput,
                        color: theme.textC,
                        maxWidth: (this.props.onForgot ? screenWidth * 0.45 : screenWidth * 0.57 ),
                    }}
                />
                {(this.props.onForgot && !this.state.focus) ?
                    <TouchableOpacity onPress={this.props.onForgot} style={AccountTextInputStyle.forgotBtn}>
                        <Text style={{ ...AccountTextInputStyle.forgotBtnText, color: theme.accent }}>
                            FORGOT
                        </Text>
                    </TouchableOpacity>
                    :
                    <View style={AccountTextInputStyle.forgotBtn} />
                }
            </View>
        );
    }
}