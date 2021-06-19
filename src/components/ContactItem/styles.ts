import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const ContactItemStyles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 90,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: screenWidth,
    },
    pfpContainer: {
        alignItems: 'center',
        borderRadius: 27.5,
        display: 'flex',
        height: 55,
        justifyContent: 'center',
        width: 55,
    },
    rootTextContainer: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 55,
        width: screenWidth * 0.73
    },
    displayNameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
