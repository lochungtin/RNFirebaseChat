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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    alignRight: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    scrollView: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: screenWidth,
    },
});

export const AccountScreenStyles = StyleSheet.create({
    loginHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 5,
        width: screenWidth * 0.8,
    },
    signInText: {
        fontSize: 20,
        marginVertical: 5,
        width: screenWidth * 0.8,
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
        height: 50,
        justifyContent: 'center',
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
        width: screenWidth * 0.65,
    },
    signUpPromptText: {
        fontSize: 16,
    },
    signUpText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    backContainer: {
        height: 200,
        paddingTop: 60,
        width: screenWidth * 0.85,
        zIndex: 2,
    },
});

export const HomeScreenStyles = StyleSheet.create({
    headerContainer: {
        alignItems: 'flex-end',
        height: 60,
        width: screenWidth * 0.90,
        zIndex: 2,
    },
    headerIcon: {
        marginLeft: 20,
    },
});
