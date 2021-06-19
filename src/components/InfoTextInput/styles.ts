import { Dimensions,StyleSheet } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const InfoTextInputStyle = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        borderTopWidth: 5,
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        width: screenWidth,
    },
    textInput: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 0,
        marginHorizontal: 8,
        width: screenWidth * 0.7,
    },
});
