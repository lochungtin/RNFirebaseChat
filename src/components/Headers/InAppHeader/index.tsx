import { Path, Svg } from 'react-native-svg';
import React from 'react';

import { theme } from '../../../data/color';
import { HeaderStyles } from '../styles';

export default class Header extends React.Component {
    render() {
        return (
            <Svg
                height='85'
                width='411'
                viewBox='0 0 411 85'
                style={HeaderStyles.SVGContainer}
            >
                <Path
                    d='M 0 2 C 1 3 3 1 7 2 C 11 3 13 3 14 2 L 14 0 L 0 0'
                    scale='30'
                    fill={theme.accent}
                    x='0'
                    y='0'
                />
            </Svg>

        );
    }
}
