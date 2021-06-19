import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import AccountTextInput from '../components/AccountTextInput';
import SignInHeader from '../components/Headers/SignInHeader';

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
        rPswd: '',
    }

    continue = () => {
        if (!this.state.email)
            return showMessage({
                backgroundColor: theme.accent,
                color: theme.textC,
                message: 'An email is required',
            });

        if (!this.state.pswd)
            return showMessage({
                backgroundColor: theme.accent,
                color: theme.textC,
                message: 'A password is required',
            });

        if (this.state.pswd !== this.state.rPswd)
            return showMessage({
                backgroundColor: theme.accent,
                color: theme.textC,
                message: `Passwords don't match`,
            });

        if (this.state.pswd.length < 6)
            return showMessage({
                backgroundColor: theme.accent,
                color: theme.textC,
                message: 'Password must have 6+ characters',
            });


        this.props.navigation.navigate('signUpInfo', { email: this.state.email, pswd: this.state.pswd });
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.screen, backgroundColor: theme.backgroundC }}>
                <SignInHeader />
                <View style={{ ...ScreenStyles.alignLeft, ...AccountScreenStyles.backContainer }}>
                    <TouchableOpacity onPress={this.props.navigation.goBack}>
                        <Icon
                            color={theme.textLightC}
                            name='chevron-left'
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={{ ...AccountScreenStyles.loginHeaderText, color: theme.textC }}>
                    Create account
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
                    placeholder='PASSWORD'
                />
                <AccountTextInput
                    hidden
                    iconName='lock-outline'
                    onChangeText={(rPswd: string) => this.setState({ rPswd })}
                    placeholder='REENTER PASSWORD'
                />
                <View style={{ ...ScreenStyles.alignRight, ...AccountScreenStyles.loginBtnContainer }}>
                    <TouchableOpacity onPress={this.continue} style={{ ...AccountScreenStyles.loginBtn, backgroundColor: theme.accent }}>
                        <Text style={{ ...AccountScreenStyles.loginText, color: theme.textLightC }}>
                            CONTINUE
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 50 }} />
                <View style={AccountScreenStyles.signUpPromptContainer}>
                    <Text style={{ ...AccountScreenStyles.signUpPromptText, color: theme.textC }}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('signIn')}>
                        <Text style={{ ...AccountScreenStyles.signUpText, color: theme.accent }}>
                            Sign In
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
