import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const MessageItemStyles = StyleSheet.create({
    positioner: {
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 5,
        width: screenWidth * 0.9,
    },
    rootContainer: {
        alignItems: 'center',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
        maxWidth: screenWidth * 0.65,
        minHeight: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    contentText: {
        fontSize: 16,
    },
    timestampText: {
        fontSize: 13,
        marginHorizontal: 10,
        marginTop: 5,
    },
});
