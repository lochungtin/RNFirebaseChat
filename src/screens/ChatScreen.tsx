import { StackNavigationProp } from '@react-navigation/stack';
import React, { createRef } from 'react';
import { RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/Headers/InAppHeader';
import MessageItem from '../components/MessageItem';

import { theme } from '../data/color';
import { ScreenStyles, ChatScreenStyles } from './styles';

import firebaseConfig from '../firebase/config';
import { firebaseFetchAccInfo, firebaseFetchLastMessage, firebaseGetLatestMessages, firebaseGetMessagesFrom, firebasePushMessage } from '../firebase/data';
import { AccountInfoType, ContactType, MessageMap, MessageType, ReduxAccountType } from '../types';
import { cidKeyGen } from '../utils/channelIDKeyGen';


interface NavProps {
    navigation: StackNavigationProp<any, any>,
    route: any,
}

interface ReduxProps {
    account: ReduxAccountType,
}

interface ScreenState {
    account: ContactType | undefined,
    cid: string,
    earliest: string,
    messages: Array<MessageType>,
    refreshing: boolean,
    text: string,
    uid: string,
}

class Screen extends React.Component<NavProps & ReduxProps, ScreenState> {

    scrollViewRef: React.RefObject<ScrollView>;

    unsubscribe: () => void;

    constructor(props: NavProps & ReduxProps) {
        super(props);
        this.state = {
            account: undefined,
            cid: cidKeyGen(props.account.firebase?.uid || '', props.route.params),
            earliest: '',
            messages: [],
            refreshing: false,
            text: '',
            uid: props.route.params,
        };

        this.refreshContent();
        this.unsubscribe = props.navigation.addListener('focus', () => this.refreshContent());

        this.scrollViewRef = createRef();
    }

    componentDidMount() {
        firebaseGetLatestMessages(this.state.cid).then((res: MessageMap) => {
            if (res === null)
                return;

            let keys: Array<string> = Object.keys(res);
            let messages: Array<MessageType> = keys.map((mid: string) => res[mid]);

            this.setState({ messages, earliest: keys[0] });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    fetchPrevMesseages = () => {
        firebaseGetMessagesFrom(this.state.cid, this.state.earliest).then((res: MessageMap) => {
            if (res === null)
                return;

            let keys: Array<string> = Object.keys(res);
            let messages: Array<MessageType> = keys.map((mid: string) => res[mid]);

            this.setState({ messages: [...messages, ...this.state.messages], earliest: keys[0] });
        });
    }

    refreshContent() {
        let uid: string = this.props.route.params;
        firebaseFetchAccInfo(uid, (res: firebaseConfig.database.DataSnapshot) => {
            let account: AccountInfoType = res.val();

            if (account === null)
                return this.props.navigation.navigate('home');

            this.setState({ account: { ...account, uid } });
        });

        firebaseFetchLastMessage(this.state.cid, (res: firebaseConfig.database.DataSnapshot) => {
            let mMap: MessageMap = res.val();

            if (mMap === null || !this.state.messages.length)
                return;

            let message: MessageType = mMap[Object.keys(mMap)[0]];

            if (this.state.messages[this.state.messages.length - 1].timestamp < message.timestamp)
                this.setState({ messages: [...this.state.messages, message] });
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('accV', this.state.uid)}>
                        <Icon
                            color={theme.textLightC}
                            name='account'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    ref={this.scrollViewRef}
                    refreshControl={<RefreshControl onRefresh={this.fetchPrevMesseages} refreshing={this.state.refreshing} />}
                    onContentSizeChange={() => this.scrollViewRef.current?.scrollToEnd()}
                >
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
            </View >
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({
    account: state.account,
});

export default connect(mapStateToProps)(Screen);
