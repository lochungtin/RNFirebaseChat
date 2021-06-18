import { Dimensions,StyleSheet } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const AccountTextInputStyle = StyleSheet.create({
    rootContainer: {
        alignItems: 'center',
        borderBottomWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'flex-start',
        marginTop: 25,
        paddingHorizontal: 10,
        width: screenWidth * 0.8,
    },
    textInput: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 0,
        marginHorizontal: 8,
        minWidth: screenWidth * 0.45,
    },
    textInputFocus: {
        borderWidth: 0,
        borderBottomWidth: 0,
        elevation: 10,
    },
    forgotBtn: {
        width: screenWidth * 0.25,
    },
    forgotBtnText: {
        fontWeight: 'bold',
        fontSize: 15,
    }
});
