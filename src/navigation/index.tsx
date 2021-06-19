import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import FlashMessage from "react-native-flash-message";
import { connect } from 'react-redux';

import AccountScreen from '../screens/AccountScreen';
import AccountViewScreen from '../screens/AccountViewScreen';
import ChatScreen from '../screens/ChatScreen';
import ForgotPswdScreen from '../screens/ForgotPswdScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpDetailScreen from '../screens/SignUpDetailScreen';
import SignUpScreen from '../screens/SignUpScreen';

import { theme } from '../data/color';

import { ReduxAccountType } from '../types';

interface ReduxProps {
    account: ReduxAccountType,
}

const RootNav = createStackNavigator();

class AppNav extends React.Component<ReduxProps> {
    render() {
        console.log(this.props.account)
        return (
            <NavigationContainer>
                <StatusBar backgroundColor={theme.accent} />
                <RootNav.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS, headerShown: false }}>
                    {this.props.account.firebase === null ?
                        <>
                            <RootNav.Screen component={SignInScreen} name='signIn' />
                            <RootNav.Screen component={SignUpScreen} name='signUp' />
                            <RootNav.Screen component={SignUpDetailScreen} name='signUpInfo' />
                            <RootNav.Screen component={ForgotPswdScreen} name='forgotPswd' />
                        </> :
                        <>
                            <RootNav.Screen component={HomeScreen} name='home' />
                            <RootNav.Screen component={ChatScreen} name='chat' />
                            <RootNav.Screen component={AccountScreen} name='acc' />
                            <RootNav.Screen component={AccountViewScreen} name='accV' />
                        </>
                    }
                </RootNav.Navigator>
                <FlashMessage position='center' />
            </NavigationContainer>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    account: state.account,
});

export default connect(mapStateToProps)(AppNav);
