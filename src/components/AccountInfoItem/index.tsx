import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { theme } from '../../data/color';
import { AccountInfoItemStyles } from './styles';

interface ReduxProps {

}

interface InfoProps {
    details: string,
    iconName: string,
    onEdit?: (text: string) => void,
    title: string,
}

class AccountInfoItem extends React.Component<ReduxProps & InfoProps> {

    state = {
        openEditModal: false,
    }

    render() {
        return (
            <View style={AccountInfoItemStyles.rootContainer}>
                <Icon
                    color={theme.textDisabledC}
                    name={this.props.iconName}
                    size={30}
                />
                <View style={AccountInfoItemStyles.textContainer}>
                    <Text style={{...AccountInfoItemStyles.titleText, color: theme.textDisabledC}}>
                        {this.props.title}
                    </Text>
                    <Text style={{...AccountInfoItemStyles.infoText, color: theme.textC}}>
                        {this.props.details}
                    </Text>
                </View>
                {this.props.onEdit && <TouchableOpacity onPress={() => this.setState({ openEditModal: true })}>
                    <Icon
                        color={theme.accent}
                        name='pencil'
                        size={30}
                    />
                </TouchableOpacity>}
            </View>
        );
    }
}

const mapStateToProps = (state: ReduxProps) => ({

});

export default connect(mapStateToProps)(AccountInfoItem);
