import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/Headers/InAppHeader';
import MessageItem from '../components/MessageItem';

import { theme } from '../data/color';
import { firebaseFetchAccInfo, firebasePushMessage } from '../firebase/data';
import { AccountInfoType, ContactType, MessageType, ReduxAccountType } from '../types';
import { cidKeyGen } from '../utils/channelIDKeyGen';
import { ScreenStyles, ChatScreenStyles } from './styles';

interface NavProps {
    navigation: StackNavigationProp<any, any>,
    route: any,
}

interface ReduxProps {
    account: ReduxAccountType,
}

interface ScreenState {
    account: ContactType | undefined,
    messages: Array<MessageType>,
    text: string,
    uid: string,
}

class Screen extends React.Component<NavProps & ReduxProps, ScreenState> {

    unsubscribe: () => void;

    constructor(props: NavProps & ReduxProps) {
        super(props);
        this.state = {
            account: undefined,
            messages: [],
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

                this.setState({ account: { ...res, uid } });
            });
    }

    send = () => {
        let sender = this.props.account.firebase?.uid || '';
        let cid = cidKeyGen(sender, this.state.account?.uid || '');
        if (!this.state.text)
            return;
        
        firebasePushMessage(sender, cid, this.state.text);
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
                        {this.state.account?.displayName}
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
                    {this.state.messages.map((message: MessageType) => {
                        return (
                            <MessageItem key={message.timestamp} message={message} />
                        );
                    })}
                </ScrollView>
                <View style={ChatScreenStyles.textInputContainer}>
                    <TextInput
                        multiline
                        onChangeText={(text: string) => this.setState({ text })}
                        placeholder='start typing ...'
                        placeholderTextColor={theme.textDisabledC}
                        style={{ ...ChatScreenStyles.textInput, borderColor: theme.textDisabledC }}
                        value={this.state.text}
                    />
                    <TouchableOpacity onPress={this.send} style={{ ...ChatScreenStyles.sendBtn, backgroundColor: theme.accent }}>
                        <Icon
                            color={theme.textLightC}
                            name='send'
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    account: state.account,
});

export default connect(mapStateToProps)(Screen);
