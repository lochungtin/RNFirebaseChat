import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import AccountTextInput from '../components/AccountTextInput';

import { theme } from '../data/color';
import { AccountScreenStyles, ScreenStyles } from './styles';

interface ReduxProps {

}

const GradientView = Animated.createAnimatedComponent(LinearGradient);

class Screen extends React.Component<ReduxProps> {

    state = {
        email: '',
        pswd: '',
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.screen, backgroundColor: theme.backgroundC }}>
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
                    onForgot={() => { }}
                    placeholder='PASSWORD'
                />
                <View style={{ ...ScreenStyles.alignLeft, ...AccountScreenStyles.loginBtnContainer }}>
                    <TouchableOpacity>
                        <GradientView
                            colors={[theme.accent, theme.accentFade]}
                            start={[1, 0]}
                            end={[0, 1]}
                            style={AccountScreenStyles.loginBtn}
                        >
                            <Icon
                                color={'transparent'}
                                name='arrow-right'
                                size={25}
                            />
                            <Text style={{ ...AccountScreenStyles.loginText, color: theme.textLightC }}>
                                LOGIN
                            </Text>
                            <Icon
                                color={theme.textLightC}
                                name='arrow-right'
                                size={25}
                            />
                        </GradientView>
                    </TouchableOpacity>
                </View>
                <View style={AccountScreenStyles.signUpPromptContainer}>
                    <Text style={{ ...AccountScreenStyles.signUpPromptText, color: theme.textC }}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity>
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
