import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import AccountScreen from '../screens/AccountScreen';
import AccountViewScreen from '../screens/AccountViewScreen';
import ChatScreen from '../screens/ChatScreen';
import ForgotPswdScreen from '../screens/ForgotPswdScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

interface ReduxProps {

}

const RootNav = createStackNavigator();

class AppNav extends React.Component<ReduxProps> {
    render() {
        return (
            <RootNav.Navigator screenOptions={{ headerShown: false }}>
                <StatusBar backgroundColor={'#FFF'} />
                <RootNav.Screen component={SignInScreen} name='signIn' />
                <RootNav.Screen component={SignUpScreen} name='signUp' />
                <RootNav.Screen component={ForgotPswdScreen} name='forgotPswd' />
                <RootNav.Screen component={HomeScreen} name='home' />
                <RootNav.Screen component={ChatScreen} name='chat' />
                <RootNav.Screen component={AccountScreen} name='acc'/>
                <RootNav.Screen component={AccountViewScreen} name='accV'/>
            </RootNav.Navigator>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({

});

export default connect(mapStateToProps)(AppNav);
