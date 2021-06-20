import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AccountInfoItem from '../components/AccountInfoItem';
import Header from '../components/Headers/InAppHeader';
import SeparatorLine from '../components/SeparatorLine';

import { theme } from '../data/color';
import { ScreenStyles, AccountScreenStyles } from './styles';

interface NavProps {
    navigation: StackNavigationProp<any, any>,
    route: any,
}

interface ScreenProps {

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

export default class Screen extends React.Component<NavProps & ScreenProps> {
    render() {
        console.log(this.props.route);
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
            </View>
        );
    }
}
