import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AccountTextInput from '../components/AccountTextInput';
import SignInHeader from '../components/Headers/SignInHeader';

import { theme } from '../data/color';
import { LoginScreensStyles, ScreenStyles } from './styles';

import { signUp } from '../firebase/auth';
import { firebaseSetAccInfo } from '../firebase/data';
import { login, updateAccInfo } from '../redux/action';
import { store } from '../redux/store';
import { AccountInfoType } from '../types';


interface NavProps {
    navigation: StackNavigationProp<any, any>,
    route: any
}

export default class Screen extends React.Component<NavProps> {

    state = {
        name: '',
        bio: '',
    }

    signUp = () => {
        console.log('s');
        if (!this.state.name)
            return showMessage({
                backgroundColor: theme.accent,
                color: theme.textC,
                message: 'A username is required',
            });

        let params: { email: string, pswd: string } = this.props.route.params;
        signUp(params.email, params.pswd)
            .then(res => {
                let accInfo: AccountInfoType = {
                    displayName: this.state.name,
                    bio: this.state.bio,
                };

                firebaseSetAccInfo(res.user?.uid || '', accInfo);

                store.dispatch(updateAccInfo(accInfo));

                store.dispatch(login({
					email: res.user?.email || '',
					uid: res.user?.uid || '',
				}));
            })
            .catch(err => {
                let message: string;

                switch (err.code) {
                    case 'auth/invalid-email':
                        message = 'Invalid Email';
                        break;
                    case 'auth/email-already-in-use':
                        message = 'Email already in use, try logging in';
                        break;
                    default:
                        message = err.toString();
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
                    Add details
                </Text>
                <Text style={{ ...LoginScreensStyles.signInText, color: theme.textDisabledC }}>
                    Setup account details
                </Text>
                <AccountTextInput
                    iconName='account'
                    onChangeText={(name: string) => this.setState({ name })}
                    placeholder='USERNAME'
                />
                <AccountTextInput
                    iconName='comment-text-outline'
                    onChangeText={(bio: string) => this.setState({ bio })}
                    placeholder='BIO'
                />
                <View style={{ ...ScreenStyles.alignRight, ...LoginScreensStyles.loginBtnContainer }}>
                    <TouchableOpacity onPress={this.signUp} style={{ ...LoginScreensStyles.loginBtn, backgroundColor: theme.accent }}>
                        <Text style={{ ...LoginScreensStyles.loginText, color: theme.textLightC }}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 100 }} />
                <View style={LoginScreensStyles.signUpPromptContainer}>
                    <Text style={{ ...LoginScreensStyles.signUpPromptText, color: theme.textC }}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('signIn')}>
                        <Text style={{ ...LoginScreensStyles.signUpText, color: theme.accent }}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}
