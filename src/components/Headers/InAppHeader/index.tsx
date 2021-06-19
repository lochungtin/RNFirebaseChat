import { Path, Svg } from 'react-native-svg';
import React from 'react';

import { theme } from '../../../data/color';
import { HeaderStyles } from '../styles';

export default class Header extends React.Component {
    render() {
        return (
            <Svg
                height='300'
                width='411'
                viewBox='0 0 411 300'
                style={HeaderStyles.SVGContainer}
            >
                <Path
                    d='M 0 1 C 4 1 6 2 7 1 L 7 0 L 0 0'
                    scale='60'
                    fill={theme.accent}
                    x='0'
                    y='0'
                />
            </Svg>

        );
    }
}