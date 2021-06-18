import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
                    Reset password
                </Text>
                <Text style={{ ...AccountScreenStyles.signInText, color: theme.textDisabledC }}>
                    An email will be sent to the following account to reset your password.
                </Text>
                <AccountTextInput
                    iconName='email-outline'
                    onChangeText={(email: string) => this.setState({ email })}
                    placeholder='EMAIL'
                />
                <View style={{ ...ScreenStyles.alignRight, ...AccountScreenStyles.loginBtnContainer }}>
                    <TouchableOpacity style={{ ...AccountScreenStyles.loginBtn, backgroundColor: theme.accent }}>
                        <Text style={{ ...AccountScreenStyles.loginText, color: theme.textLightC }}>
                            RESET
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
