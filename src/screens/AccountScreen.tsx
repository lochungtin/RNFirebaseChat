import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import AccountInfoItem from '../components/AccountInfoItem';

import Header from '../components/Headers/InAppHeader';
import SeparatorLine from '../components/SeparatorLine';

import { theme } from '../data/color';
import { ReduxAccountType } from '../types';
import { AccountScreenStyles, ScreenStyles, screenWidth } from './styles';

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
    render() {
        return (
            <View style={ScreenStyles.screen}>
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
                <SeparatorLine width={screenWidth * 0.8} />
                <AccountInfoItem
                    details={this.props.account.info?.displayName || ''}
                    iconName='account'
                    onEdit={() => { }}
                    title='USERNAME'
                />
                <AccountInfoItem
                    details={this.props.account.info?.bio || ''}
                    iconName='comment-text-outline'
                    onEdit={() => { }}
                    title='BIO'
                />
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    account: state.account,
});

export default connect(mapStateToProps)(Screen);
