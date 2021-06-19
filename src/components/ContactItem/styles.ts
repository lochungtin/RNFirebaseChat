import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const ContactItemStyles = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        height: 100,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: screenWidth,
    },
    pfpContainer: {
        alignItems: 'center',
        borderRadius: 30,
        display: 'flex',
        height: 60,
        justifyContent: 'center',
        width: 60,
    },
    rootTextContainer: {
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 55,
        width: screenWidth * 0.70
    },
    displayNameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastMessageText: {
        fontSize: 16,
    },
    timestampText: {
        fontSize: 14,
    },
});
