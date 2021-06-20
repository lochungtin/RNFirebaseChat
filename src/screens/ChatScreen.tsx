import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import Header from '../components/Headers/InAppHeader';

import { theme } from '../data/color';
import { ScreenStyles, AccountScreenStyles } from './styles';

interface NavProps {
    navigation: StackNavigationProp<any, any>,
}

interface ReduxProps {

}

class Screen extends React.Component<NavProps & ReduxProps> {
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
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({

});

export default connect(mapStateToProps)(Screen);
