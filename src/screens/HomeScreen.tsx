import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../redux/action';
import { store } from '../redux/store';

interface ReduxProps {

}

class Screen extends React.Component<ReduxProps> {
    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => store.dispatch(logout())}>
                    <Text>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({

});

export default connect(mapStateToProps)(Screen);
