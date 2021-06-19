import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/Headers/InAppHeader';

import { theme } from '../data/color';
import { HomeScreenStyles, ScreenStyles } from './styles';


import { signOut } from '../firebase/auth';
import { logout } from '../redux/action';
import { store } from '../redux/store';
import { AccountInfoType } from '../types';
import ContactItem from '../components/ContactItem';

interface NavProps {
    navigation: StackNavigationProp<any, any>,
}

interface ReduxProps {
    account: AccountInfoType,
}

class Screen extends React.Component<NavProps & ReduxProps> {

    logout = () => {
        store.dispatch(logout());
        signOut();
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.screen, backgroundColor: theme.backgroundC }}>
                <Header />
                <View style={{ ...ScreenStyles.alignRight, ...HomeScreenStyles.headerContainer }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('acc')} style={HomeScreenStyles.headerIcon}>
                        <Icon
                            color={theme.textLightC}
                            name='account'
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.logout} style={HomeScreenStyles.headerIcon}>
                        <Icon
                            color={theme.textLightC}
                            name='logout'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
                        return (
                            <ContactItem
                                key={num}
                                contact={{
                                    displayName: 'Someone',
                                    lastMessage: {
                                        content: 'i want to die',
                                        isSender: true,
                                        timestamp: 123490,
                                    },
                                    uid: 'cunt',
                                    pinned: true,
                                }}
                                onPress={() => { console.log('p') }}
                                onPressPic={() => { console.log('pfp') }}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    account: state.account
});

export default connect(mapStateToProps)(Screen);
