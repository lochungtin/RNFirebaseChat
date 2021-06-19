import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import ContactItem from '../components/ContactItem';
import Header from '../components/Headers/InAppHeader';

import { theme } from '../data/color';
import { HomeScreenStyles, ScreenStyles } from './styles';

import { signOut } from '../firebase/auth';
import { firebaseFetchContacts } from '../firebase/data';
import { logout } from '../redux/action';
import { store } from '../redux/store';
import { ContactMap, ReduxAccountType } from '../types';

interface NavProps {
    navigation: StackNavigationProp<any, any>,
}

interface ReduxProps {
    account: ReduxAccountType,
    contacts: ContactMap,
}

class Screen extends React.Component<NavProps & ReduxProps> {

    state = {
        modalMode: '',
    }

    logout = () => {
        store.dispatch(logout());
        signOut();
    }

    render() {
        firebaseFetchContacts(this.props.account.firebase?.uid || '', val => console.log(val.val()));

        let action: Array<any> = [
            {
                color: theme.accent,
                icon: <Icon
                    color={theme.textLightC}
                    name='qrcode'
                    size={20}
                />,
                name: 'code',
                text: 'MY QR CODE',
                textColor: theme.textC,
            },
            {
                color: theme.accent,
                icon: <Icon
                    color={theme.textLightC}
                    name='camera'
                    size={20}
                />,
                name: 'scan',
                text: 'SCANNER',
                textColor: theme.textC,
            },
        ];

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
                <FloatingAction
                    actions={action}
                    color={theme.accent}
                    onPressItem={(modalMode: string | undefined) => this.setState({ modalMode: modalMode || '' })}
                    overlayColor='#000000A0'
                />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    account: state.account,
    contacts: state.contacts,
});

export default connect(mapStateToProps)(Screen);
