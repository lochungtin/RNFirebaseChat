import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import AccountTextInput from '../components/AccountTextInput';
import SignInHeader from '../components/SignInHeader';

import { theme } from '../data/color';
import { AccountScreenStyles, ScreenStyles } from './styles';

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
                    <TouchableOpacity style={{ ...AccountScreenStyles.loginBtn, backgroundColor: theme.accent }}>
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
