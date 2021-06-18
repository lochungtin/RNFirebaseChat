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
        name: '',
        bio: '',
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
                    Add details
                </Text>
                <Text style={{ ...AccountScreenStyles.signInText, color: theme.textDisabledC }}>
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
                <View style={{ ...ScreenStyles.alignRight, ...AccountScreenStyles.loginBtnContainer }}>
                    <TouchableOpacity style={{ ...AccountScreenStyles.loginBtn, backgroundColor: theme.accent }}>
                        <Text style={{ ...AccountScreenStyles.loginText, color: theme.textLightC }}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 100 }} />
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
