import { Path, Svg } from 'react-native-svg';
import React from 'react';

import { theme } from '../../../data/color';
import { HeaderStyles } from '../styles';

export default class Header extends React.Component {
    render() {
        return (
            <Svg
                height='90'
                width='411'
                viewBox='0 0 411 90'
                style={HeaderStyles.SVGContainer}
            >
                <Path
                    d='M 0 3 C 2 4 4 2 14 4 C 19 5 20 4 21 3 L 21 0 L 0 0'
                    scale='20'
                    fill={theme.accent}
                    x='0'
                    y='0'
                />
            </Svg>

        );
    }
}
