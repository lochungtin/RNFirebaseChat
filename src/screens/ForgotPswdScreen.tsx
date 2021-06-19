import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AccountTextInput from '../components/AccountTextInput';
import SignInHeader from '../components/Headers/SignInHeader';

import { theme } from '../data/color';
import { LoginScreensStyles, ScreenStyles } from './styles';

import { resetPswd } from '../firebase/auth';

interface NavProps {
    navigation: StackNavigationProp<any, any>
}

export default class Screen extends React.Component<NavProps> {

    state = {
        email: '',
    }

    resetPswd = () => {
        if (!this.state.email)
            return showMessage({
                backgroundColor: theme.accent,
                color: theme.textC,
                message: 'Enter email to reset password'
            });

        resetPswd(this.state.email)
            .then(() => showMessage({
                backgroundColor: theme.accent,
                color: theme.textC,
                message: 'Reset password email sent',
            }))
            .catch(err => {
                let message: string;

                switch (err.code) {
                    case 'auth/user-not-found':
                        message = 'No accounts registered under this email'
                        break;
                    default:
                        message = err.toString();
                        break;
                }

                showMessage({
                    message,
                    backgroundColor: theme.accent,
                    color: theme.textC,
                });
            });
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.screen, backgroundColor: theme.backgroundC }}>
                <SignInHeader />
                <View style={{ ...ScreenStyles.alignLeft, ...LoginScreensStyles.backContainer }}>
                    <TouchableOpacity onPress={this.props.navigation.goBack}>
                        <Icon
                            color={theme.textLightC}
                            name='chevron-left'
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={{ ...LoginScreensStyles.loginHeaderText, color: theme.textC }}>
                    Reset password
                </Text>
                <Text style={{ ...LoginScreensStyles.signInText, color: theme.textDisabledC }}>
                    An email will be sent to the following account to reset your password.
                </Text>
                <AccountTextInput
                    iconName='email-outline'
                    onChangeText={(email: string) => this.setState({ email })}
                    placeholder='EMAIL'
                />
                <View style={{ ...ScreenStyles.alignRight, ...LoginScreensStyles.loginBtnContainer }}>
                    <TouchableOpacity onPress={this.resetPswd} style={{ ...LoginScreensStyles.loginBtn, backgroundColor: theme.accent }}>
                        <Text style={{ ...LoginScreensStyles.loginText, color: theme.textLightC }}>
                            RESET
                        </Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}
