import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';

import ContactItem from '../components/ContactItem';
import Header from '../components/Headers/InAppHeader';

import { theme } from '../data/color';
import { HomeScreenStyles, ScreenStyles } from './styles';

import { signOut } from '../firebase/auth';
import firebaseConfig from '../firebase/config';
import { firebaseAddFriends, firebaseFetchAccInfo, firebaseFetchContacts, firebaseFetchLastMessage } from '../firebase/data';
import { logout } from '../redux/action';
import { store } from '../redux/store';
import { AccountInfoType, ContactType, MessageMap, MessageType, ReduxAccountType } from '../types';
import { cidKeyGen } from '../utils/channelIDKeyGen';

interface NavProps {
    navigation: StackNavigationProp<any, any>,
}

interface ReduxProps {
    account: ReduxAccountType,
}

interface ScreenState {
    contacts: Array<string>
    modalMode: string,
    refreshing: boolean,
}

class Screen extends React.Component<NavProps & ReduxProps, ScreenState> {

    constructor(props: NavProps & ReduxProps) {
        super(props);
        this.state = {
            contacts: [],
            modalMode: '',
            refreshing: false,
        }

        this.refreshContent();
    }

    close = () => this.setState({ modalMode: '' });

    logout = () => {
        store.dispatch(logout());
        signOut();
    }

    modalContent = () => {
        switch (this.state.modalMode) {
            case 'qrcode':
                return (
                    <View style={{ ...HomeScreenStyles.popupContainer, backgroundColor: theme.accentFade }}>
                        <Text style={{ ...HomeScreenStyles.scanMeText, color: theme.textC }}>
                            SCAN ME
                        </Text>
                        <QRCode
                            backgroundColor={theme.accentFade}
                            value={this.props.account.firebase?.uid}
                            size={200}
                        />
                    </View>
                );
            case 'camera':
                return (
                    <QRCodeScanner
                        cameraStyle={{
                            width: 300,
                        }}
                        containerStyle={{
                            alignItems: 'center',
                            borderRadius: 20,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                        markerStyle={{ borderColor: theme.accent }}
                        onRead={this.onScan}
                        showMarker={true}
                    />
                );
            default:
                return <View />;
        }
    }

    onScan = (event: any) => {
        firebaseAddFriends(this.props.account.firebase?.uid || '', event.data);
        this.setState({ modalMode: '' });
    }

    refreshContent = () => {
        firebaseFetchContacts(this.props.account.firebase?.uid || '', (res: firebaseConfig.database.DataSnapshot) =>
            this.setState({ contacts: Object.keys(res.val() || []) }));
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
                <ScrollView refreshControl={<RefreshControl onRefresh={this.refreshContent} refreshing={this.state.refreshing} />}>
                    {this.state.contacts.map((uid: string) => {
                        return (
                            <ContactItem
                                onPress={() => this.props.navigation.navigate('chat', uid)}
                                onPressPic={() => this.props.navigation.navigate('accV', uid)}
                                uid={uid}
                            />
                        );
                    })}
                    <View style={{ height: 40 }} />
                </ScrollView>
                <FloatingAction
                    actions={[
                        { name: 'qrcode', text: 'MY QR CODE' },
                        { name: 'camera', text: 'SCANNER' }
                    ].map(elem => ({
                        ...elem,
                        color: theme.accent,
                        icon: <Icon
                            color={theme.textLightC}
                            name={elem.name}
                            size={20}
                        />,
                        textColor: theme.textC,
                    }))}
                    color={theme.accent}
                    onPressItem={(modalMode: string | undefined) => this.setState({ modalMode: modalMode || '' })}
                    overlayColor='#00000020'
                />
                <Modal
                    backdropOpacity={0}
                    isVisible={this.state.modalMode !== ''}
                    onBackButtonPress={this.close}
                    onBackdropPress={this.close}
                    onSwipeComplete={this.close}
                    propagateSwipe={true}
                    style={HomeScreenStyles.modalRoot}
                    swipeDirection='down'
                >
                    {this.modalContent()}
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    account: state.account,
});

export default connect(mapStateToProps)(Screen);
