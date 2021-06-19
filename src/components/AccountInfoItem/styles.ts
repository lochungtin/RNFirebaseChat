import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const AccountInfoItemStyles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        minHeight: 50,
        justifyContent: 'space-between',
        marginTop: 40,
        width: screenWidth * 0.8,
    },
    textContainer: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 50,
        justifyContent: 'space-between',
        width: screenWidth * 0.5,
    },
    titleText: {
        fontSize: 16,
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
