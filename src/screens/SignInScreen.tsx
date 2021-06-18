import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { connect } from 'react-redux';

import AccountTextInput from '../components/AccountTextInput';
import SignInHeader from '../components/SignInHeader';

import { theme } from '../data/color';
import { AccountScreenStyles, ScreenStyles } from './styles';

import { signIn } from '../firebase/auth';
import { login } from '../redux/action';
import { store } from '../redux/store';

interface NavProps {
    navigation: StackNavigationProp<any, any>
}

interface ReduxProps {

}

class Screen extends React.Component<NavProps & ReduxProps> {

    state = {
        email: '',
        pswd: '',
    }

    login = () => {
        if (this.state.email === '' || this.state.pswd === '')
            return;

        signIn(this.state.email, this.state.pswd)
            .then(res => {
                store.dispatch(login({
					email: res.user?.email || '',
					uid: res.user?.uid || '',
				}));
            })
            .catch(err => {
                let message: string;

                switch (err.code) {
                    case 'auth/invalid-email':
                        message = 'Invalid email provided';
                        break;
                    case 'auth/wrong-password':
                        message = 'Password entered is not correct';
                        break;
                    case 'auth/user-not-found':
                        message = 'Email no registered'
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
                <View style={{ height: 200 }} />
                <Text style={{ ...AccountScreenStyles.loginHeaderText, color: theme.textC }}>
                    Login
                </Text>
                <Text style={{ ...AccountScreenStyles.signInText, color: theme.textDisabledC }}>
                    Please sign in to continue
                </Text>
                <AccountTextInput
                    iconName='email-outline'
                    onChangeText={(email: string) => this.setState({ email })}
                    placeholder='EMAIL'
                />
                <AccountTextInput
                    hidden
                    iconName='lock-outline'
                    onChangeText={(pswd: string) => this.setState({ pswd })}
                    onForgot={() => this.props.navigation.navigate('forgotPswd')}
                    placeholder='PASSWORD'
                />
                <View style={{ ...ScreenStyles.alignRight, ...AccountScreenStyles.loginBtnContainer }}>
                    <TouchableOpacity onPress={this.login} style={{ ...AccountScreenStyles.loginBtn, backgroundColor: theme.accent }}>
                        <Text style={{ ...AccountScreenStyles.loginText, color: theme.textLightC }}>
                            LOGIN
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 100 }} />
                <View style={AccountScreenStyles.signUpPromptContainer}>
                    <Text style={{ ...AccountScreenStyles.signUpPromptText, color: theme.textC }}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('signUp')}>
                        <Text style={{ ...AccountScreenStyles.signUpText, color: theme.accent }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({

});

export default connect(mapStateToProps)(Screen);
