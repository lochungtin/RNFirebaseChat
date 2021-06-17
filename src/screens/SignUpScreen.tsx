import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

interface ReduxProps {

}

class Screen extends React.Component<ReduxProps> {
    render() {
        return (
            <View>
                <Text>
                    
                </Text>
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({

});

export default connect(mapStateToProps)(Screen);
