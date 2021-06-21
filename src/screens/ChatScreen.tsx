import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/Headers/InAppHeader';
import SeparatorLine from '../components/SeparatorLine';

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
    text: string,
    uid: string,
}

class Screen extends React.Component<NavProps & ReduxProps, ScreenState> {

    unsubscribe: () => void;

    constructor(props: NavProps & ReduxProps) {
        super(props);
        this.state = {
            account: undefined,
            displayName: '',
            text: '',
            uid: props.route,
        };

        this.refreshContent();
        this.unsubscribe = props.navigation.addListener('focus', () => this.refreshContent());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    refreshContent() {
        let uid: string = this.props.route.params;
        firebaseFetchAccInfo(uid)
            .then((res: AccountInfoType) => {
                if (res === null)
                    return this.props.navigation.navigate('home');

                this.setState({ account: { ...res, uid }, displayName: res.displayName, })
            });
    }

    send = () => {
        console.log(this.state.text);
        this.setState({ text: '' });
    }

    render() {
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
                <ScrollView>

                </ScrollView>
                <SeparatorLine width={1} />
                <View style={ChatScreenStyles.textInputContainer}>
                    <TextInput
                        multiline
                        onChangeText={(text: string) => this.setState({ text })}
                        placeholder='start typing ...'
                        placeholderTextColor={theme.textDisabledC}
                        style={{ ...ChatScreenStyles.textInput, borderColor: theme.textDisabledC }}
                        value={this.state.text}
                    />
                    <TouchableOpacity onPress={this.send}>
                        <Icon
                            color={theme.accent}
                            name='send-circle'
                            size={50}
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
