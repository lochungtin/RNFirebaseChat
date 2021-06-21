import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AccountInfoItem from '../components/AccountInfoItem';
import Header from '../components/Headers/InAppHeader';
import SeparatorLine from '../components/SeparatorLine';

import { theme } from '../data/color';
import { ScreenStyles, AccountScreensStyles } from './styles';

import firebaseConfig from '../firebase/config';
import { firebaseClearChat, firebaseFetchAccInfo, firebaseRemoveFriend } from '../firebase/data';
import { AccountInfoType, ReduxAccountType } from '../types';

interface NavProps {
    navigation: StackNavigationProp<any, any>,
    route: any,
}

interface ReduxProps {
    account: ReduxAccountType
}

interface ScreenState {
    account: AccountInfoType,
    refreshing: boolean,
}

class Screen extends React.Component<NavProps & ReduxProps, ScreenState> {

    constructor(props: NavProps & ReduxProps) {
        super(props);
        this.state = {
            account: {
                displayName: '',
                bio: '',
            },
            refreshing: false,
        }

        this.refreshContent();
    }

    clearChat = () => {
        firebaseClearChat(this.props.account.firebase?.uid || '', this.props.route.params);
        this.props.navigation.navigate('home');
    }

    refreshContent = () => firebaseFetchAccInfo(this.props.route.params, (res: firebaseConfig.database.DataSnapshot) => {
        let account: AccountInfoType = res.val();

        if (account === null)
            return;

        this.setState({ account });
    });

    removeFriend = () => {
        firebaseRemoveFriend(this.props.account.firebase?.uid || '', this.props.route.params);
        this.props.navigation.navigate('home');
    }

    render() {
        return (
            <View style={{ ...ScreenStyles.screen, backgroundColor: theme.backgroundC }}>
                <Header />
                <View style={{ ...ScreenStyles.alignLeft, ...AccountScreensStyles.headerContainer }}>
                    <TouchableOpacity onPress={this.props.navigation.goBack}>
                        <Icon
                            color={theme.textLightC}
                            name='chevron-left'
                            size={40}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView refreshControl={<RefreshControl onRefresh={this.refreshContent} refreshing={this.state.refreshing} />}>
                    <View style={AccountScreensStyles.pfpStackPositioner}>
                        <View style={{ ...AccountScreensStyles.pfpContainer, backgroundColor: theme.accentFade }}>
                            <Icon
                                color={theme.textLightC}
                                name='account'
                                size={100}
                            />
                        </View>
                    </View>
                    <SeparatorLine width={0.8} />
                    <AccountInfoItem
                        details={this.state.account.displayName}
                        iconName='account'
                        title='DISPLAY NAME'
                    />
                    <AccountInfoItem
                        details={this.state.account.bio}
                        iconName='comment-text-outline'
                        title='BIO'
                    />
                    <View style={{ height: 40 }} />
                    <SeparatorLine width={0.8} />
                    <TouchableOpacity onPress={this.clearChat} style={AccountScreensStyles.removeFriendContainer}>
                        <Icon
                            color={theme.textWarnC}
                            name='comment-remove-outline'
                            size={35}
                        />
                        <Text style={{ ...AccountScreensStyles.removeFriendText, color: theme.textWarnC }}>
                            CLEAR CHAT
                        </Text>
                        <Icon
                            color='transparent'
                            name='cancel'
                            size={35}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.removeFriend} style={AccountScreensStyles.removeFriendContainer}>
                        <Icon
                            color={theme.textWarnC}
                            name='cancel'
                            size={35}
                        />
                        <Text style={{ ...AccountScreensStyles.removeFriendText, color: theme.textWarnC }}>
                            REMOVE FRIEND
                        </Text>
                        <Icon
                            color='transparent'
                            name='cancel'
                            size={35}
                        />
                    </TouchableOpacity>

                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    account: state.account,
});

export default connect(mapStateToProps)(Screen);
