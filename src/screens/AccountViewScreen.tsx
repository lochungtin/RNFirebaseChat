import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AccountInfoItem from '../components/AccountInfoItem';
import Header from '../components/Headers/InAppHeader';
import SeparatorLine from '../components/SeparatorLine';

import { theme } from '../data/color';
import { ScreenStyles, AccountScreensStyles } from './styles';

import { firebaseClearChat, firebaseRemoveFriend } from '../firebase/data';
import { ReduxAccountType } from '../types';
import { connect } from 'react-redux';

interface NavProps {
    navigation: StackNavigationProp<any, any>,
    route: any,
}

interface ReduxProps {
    account: ReduxAccountType
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

    removeFriend = () => {
        firebaseRemoveFriend(this.props.account.firebase?.uid || '', this.props.route.params.uid);
        this.props.navigation.goBack();
    }

    render() {
        console.log(this.props.route);
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
                <View style={AccountScreensStyles.pfpStack}>
                    <View style={AccountScreensStyles.pfpContainer}>
                        <View style={tempPfp}>
                            <Icon
                                color={theme.textLightC}
                                name='account'
                                size={100}
                            />
                        </View>
                    </View>
                </View>
                <SeparatorLine width={0.8} />
                <AccountInfoItem
                    details={this.props.route.params.displayName}
                    iconName='account'
                    title='DISPLAY NAME'
                />
                <AccountInfoItem
                    details={this.props.route.params.bio}
                    iconName='comment-text-outline'
                    title='BIO'
                />
                <View style={{ height: 40 }} />
                <SeparatorLine width={0.8} />
                <TouchableOpacity onPress={() => firebaseClearChat(this.props.account.firebase?.uid || '', this.props.route.params.uid)} style={AccountScreensStyles.removeFriendContainer}>
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
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    account: state.account,
});

export default connect(mapStateToProps)(Screen);
