import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/Headers/InAppHeader';

import { theme } from '../data/color';
import { firebaseFetchAccInfo } from '../firebase/data';
import { AccountInfoType, ContactType } from '../types';
import { ScreenStyles, ChatScreenStyles } from './styles';

interface NavProps {
    navigation: StackNavigationProp<any, any>,
    route: any,
}

interface ReduxProps {

}

interface ScreenState {
    account: ContactType | undefined,
    displayName: string,
    uid: string,
}

class Screen extends React.Component<NavProps & ReduxProps, ScreenState> {

    unsubscribe: (uid: string) => void;

    constructor(props: NavProps & ReduxProps) {
        super(props);
        this.state = {
            account: undefined,
            displayName: '',
            uid: props.route,
        };

        this.refreshContent(props.route.params);
        this.unsubscribe = props.navigation.addListener('focus', () => this.refreshContent(props.route.params));
    }

    componentWillUnmount() {
        this.unsubscribe(this.state.uid);
    }

    refreshContent(uid: string) {
        firebaseFetchAccInfo(uid)
            .then((res: AccountInfoType) => {
                if (res === null)
                    return this.props.navigation.navigate('chat');

                this.setState({ account: { ...res, uid }, displayName: res.displayName, })
            });
    }

    render() {
        console.log(this.props.route);
        return (
            <View style={{ ...ScreenStyles.screen, backgroundColor: theme.backgroundC }}>
                <Header />
                <View style={ChatScreenStyles.headerContainer}>
                    <TouchableOpacity onPress={this.props.navigation.goBack}>
                        <Icon
                            color={theme.textLightC}
                            name='chevron-left'
                            size={40}
                        />
                    </TouchableOpacity>
                    <Text style={{ ...ChatScreenStyles.displayNameText, color: theme.textLightC }}>
                        {this.state.displayName}
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('accV', this.state.account)}>
                        <Icon
                            color={theme.textLightC}
                            name='account'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({

});

export default connect(mapStateToProps)(Screen);
