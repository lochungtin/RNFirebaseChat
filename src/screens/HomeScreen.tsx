import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/Headers/InAppHeader';
import { theme } from '../data/color';
import { signOut } from '../firebase/auth';

import { logout } from '../redux/action';
import { store } from '../redux/store';
import { HomeScreenStyles, ScreenStyles } from './styles';

interface ReduxProps {

}

class Screen extends React.Component<ReduxProps> {

    logout = () => {
        store.dispatch(logout());
        signOut();
    }

    render() {
        return (
            <View>
                <Header />
                <View style={{ ...ScreenStyles.alignRight, ...HomeScreenStyles.headerContainer }}>
                    <TouchableOpacity style={HomeScreenStyles.headerIcon}>
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
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({

});

export default connect(mapStateToProps)(Screen);
