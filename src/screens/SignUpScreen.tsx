import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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

const GradientView = Animated.createAnimatedComponent(LinearGradient);

class Screen extends React.Component<NavProps & ReduxProps> {

    state = {
        email: '',
        name: '',
        pswd: '',
        rPswd: '',
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
                <ScrollView>
                    <View style={ScreenStyles.scrollView}>
                        <Text style={{ ...AccountScreenStyles.loginHeaderText, color: theme.textC }}>
                            Create account
                        </Text>
                        <AccountTextInput
                            iconName='account'
                            onChangeText={(name: string) => this.setState({ name })}
                            placeholder='USERNAME'
                        />
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
                            <TouchableOpacity>
                                <GradientView
                                    end={[0, 1]}
                                    colors={[theme.accent, theme.accentFade]}
                                    start={[1, 0]}
                                    style={AccountScreenStyles.loginBtn}
                                >
                                    <Icon
                                        color={'transparent'}
                                        name='arrow-right'
                                        size={25}
                                    />
                                    <Text style={{ ...AccountScreenStyles.loginText, color: theme.textLightC }}>
                                        SIGN UP
                                     </Text>
                                    <Icon
                                        color={'transparent'}
                                        name='arrow-right'
                                        size={25}
                                    />
                                </GradientView>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 50 }} />
                        <View style={AccountScreenStyles.signUpPromptContainer}>
                            <Text style={{ ...AccountScreenStyles.signUpPromptText, color: theme.textC }}>
                                Already have an account?
                            </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('signUp')}>
                                <Text style={{ ...AccountScreenStyles.signUpText, color: theme.accent }}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View >
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({

});

export default connect(mapStateToProps)(Screen);
