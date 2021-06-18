import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const HeaderStyles = StyleSheet.create({
    SVGContainer: {
        position: 'absolute', 
        zIndex: 1,
    },
});
