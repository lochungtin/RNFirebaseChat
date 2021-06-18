import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

export const ScreenStyles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: screenWidth,
    },
    alignLeft: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});

export const AccountScreenStyles = StyleSheet.create({
    loginHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 5,
        width: screenWidth * 0.75,
    },
    signInText: {
        fontSize: 20,
        marginVertical: 5,
        width: screenWidth * 0.75,
    },
    loginBtnContainer: {
        marginTop: 50,
        width: screenWidth * 0.8
    },
    loginBtn: {
        alignItems: 'center',
        borderRadius: 25,
        display: 'flex',
        elevation: 5,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        width: 150,
    },
    loginText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    signUpPromptContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 100,
        width: screenWidth * 0.6,
    },
    signUpPromptText: {
        fontSize: 16,
    },
    signUpText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
