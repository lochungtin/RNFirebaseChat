import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import ContactItem from '../components/ContactItem';
import Header from '../components/Headers/InAppHeader';

import { theme } from '../data/color';
import { HomeScreenStyles, ScreenStyles } from './styles';

import { signOut } from '../firebase/auth';
import { logout } from '../redux/action';
import { store } from '../redux/store';
import { AccountInfoType, ContactMap, ContactType } from '../types';

interface NavProps {
    navigation: StackNavigationProp<any, any>,
}

interface ReduxProps {
    account: AccountInfoType,
    contacts: ContactMap,
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
                    {Object.keys(this.props.contacts).map(key => {
                        let contact = this.props.contacts[key];
                        return (
                            <ContactItem
                                key={contact.uid}
                                contact={contact}
                                onPress={() => this.props.navigation.navigate('chat', contact)}
                                onPressPic={() => this.props.navigation.navigate('accV', contact)}
                            />
                        );
                    })}
                    <View style={{ height: 40 }} />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    account: state.account,
    contacts: state.contacts,
});

export default connect(mapStateToProps)(Screen);
