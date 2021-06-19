import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import AccountInfoItem from '../components/AccountInfoItem';
import Header from '../components/Headers/InAppHeader';
import InfoTextInput from '../components/InfoTextInput';
import SeparatorLine from '../components/SeparatorLine';

import { theme } from '../data/color';
import { AccountScreenStyles, ScreenStyles } from './styles';

import { changePswd } from '../firebase/auth';
import { firebaseSetAccInfo } from '../firebase/data';
import { store } from '../redux/store';
import { updateAccInfo } from '../redux/action';
import { AccountInfoType, ReduxAccountType } from '../types';

interface NavProps {
    navigation: StackNavigationProp<any, any>,
}

interface ReduxProps {
    account: ReduxAccountType,
}

const tempPfp: StyleProp<ViewStyle> = {
    alignItems: 'center',
    backgroundColor: theme.accentFade,
    borderRadius: 80,
    display: 'flex',
    height: 160,
    justifyContent: 'center',
    width: 160,
};

class Screen extends React.Component<NavProps & ReduxProps> {

    state = {
        curPswd: '',
        editMode: '',
        pswd: '',
    }

    close = () => this.setState({ editMode: '' });

    modalContent = () => {
        switch (this.state.editMode) {
            case 'n':
                return (
                    <InfoTextInput
                        iconName='account'
                        onConfirm={(text: string) => this.update(text, 0)}
                        placeholder='display name'
                    />
                );
            case 'b':
                return (
                    <InfoTextInput
                        iconName='comment-text-outline'
                        onConfirm={(text: string) => this.update(text, 1)}
                        placeholder='bio'
                    />
                );
            case 'p':
                return (
                    <>
                        <InfoTextInput
                            hidden
                            iconName='lock-open'
                            onChangeText={(curPswd: string) => this.setState({ curPswd })}
                            placeholder='current password'
                        />
                        <InfoTextInput
                            hidden
                            notTop
                            iconName='lock'
                            onChangeText={(pswd: string) => this.setState({ pswd })}
                            placeholder='new password'
                        />
                        <InfoTextInput
                            hidden
                            notTop
                            iconName='lock'
                            onConfirm={this.updatePswd}
                            placeholder='reenter new password'
                        />
                    </>
                );
            default:
                return <View />;
        }
    }

    update = (text: string, field: number) => {
        let payload: AccountInfoType = {
            displayName: field ? (this.props.account.info?.displayName || '') : text,
            bio: field ? text : (this.props.account.info?.bio || ''),
        }

        store.dispatch(updateAccInfo(payload));
        firebaseSetAccInfo(this.props.account.firebase?.uid || '', payload);

        this.setState({ editMode: '' });
    }

    updatePswd = (rPswd: string) => {
        if (!this.state.curPswd)
            return showMessage({
                backgroundColor: theme.accent,
                color: theme.textC,
                message: 'Reenter your current password to change passwords',
            });

        if (!this.state.pswd)
            return showMessage({
                backgroundColor: theme.accent,
                color: theme.textC,
                message: 'A password is required',
            });

        if (this.state.pswd !== rPswd)
            return showMessage({
                backgroundColor: theme.accent,
                color: theme.textC,
                message: `New passwords don't match`,
            });

        if (this.state.pswd.length < 6)
            return showMessage({
                backgroundColor: theme.accent,
                color: theme.textC,
                message: 'Password must have 6+ characters',
            });

        changePswd(this.props.account.firebase?.email || '', this.state.curPswd, this.state.pswd)
            .then(() => {
                showMessage({
                    backgroundColor: theme.backgroundC,
                    color: theme.accent,
                    message: 'Password change successful',
                });
                this.setState({ editMode: '', pswd: '' });
            })
            .catch(err => {
                let message: string;
                let description: string | undefined;

                switch (err.code) {
                    case 'auth/wrong-password':
                        message = 'Password entered is incorrect';
                        break;
                    default:
                        message = err.toString();
                        description = err.toString();
                }

                showMessage({
                    description,
                    message,
                    backgroundColor: theme.accent,
                    color: theme.textC,
                });
                this.setState({ editMode: '', pswd: '' });
            });
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.screen, backgroundColor: theme.backgroundC }}>
                <Header />
                <View style={{ ...ScreenStyles.alignLeft, ...AccountScreenStyles.headerContainer }}>
                    <TouchableOpacity onPress={this.props.navigation.goBack}>
                        <Icon
                            color={theme.textLightC}
                            name='chevron-left'
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={ScreenStyles.scrollView}>
                        <View style={AccountScreenStyles.pfpStack}>
                            <View style={AccountScreenStyles.pfpContainer}>
                                <View style={tempPfp}>
                                    <Icon
                                        color={theme.textLightC}
                                        name='account'
                                        size={100}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => { }} style={{ ...AccountScreenStyles.pfpEditBtn, backgroundColor: theme.accent }}>
                                <Icon
                                    color={theme.textLightC}
                                    name='pencil'
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                        <SeparatorLine width={0.8} />
                        <AccountInfoItem
                            details={this.props.account.info?.displayName || ''}
                            iconName='account'
                            onEdit={() => this.setState({ editMode: 'n' })}
                            title='DISPLAY NAME'
                        />
                        <AccountInfoItem
                            details={this.props.account.info?.bio || ''}
                            iconName='comment-text-outline'
                            onEdit={() => this.setState({ editMode: 'b' })}
                            title='BIO'
                        />
                        <AccountInfoItem
                            details='*********'
                            iconName='lock'
                            onEdit={() => this.setState({ editMode: 'p' })}
                            title='PASSWORD'
                        />
                    </View>
                </ScrollView>
                <Modal
                    backdropOpacity={0}
                    isVisible={this.state.editMode !== ''}
                    onBackButtonPress={this.close}
                    onBackdropPress={this.close}
                    onSwipeComplete={this.close}
                    propagateSwipe={true}
                    style={AccountScreenStyles.modalRootContainer}
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
