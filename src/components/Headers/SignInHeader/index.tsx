import { Path, Svg } from 'react-native-svg';
import React from 'react';

import { theme } from '../../../data/color';
import { HeaderStyles } from '../styles';

export default class SignInHeader extends React.Component {
    render() {
        return (
            <Svg
                height='300'
                width='411'
                viewBox='0 0 411 300'
                style={HeaderStyles.SVGContainer}
            >
                <Path
                    d='M 0 2 C 1 4 3 1 4 3 c 1 2 1 -1 2 1 C 7 6 7 5 7 5 L 7 0 L 0 0 L 0 2'
                    scale='60'
                    fill={theme.accent}
                    x='0'
                    y='-30'
                />
            </Svg>

        );
    }
}
