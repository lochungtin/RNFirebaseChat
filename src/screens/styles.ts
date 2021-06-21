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

export const LoginScreensStyles = StyleSheet.create({
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
        width: screenWidth * 0.87,
        zIndex: 2,
    },
    headerIcon: {
        marginLeft: 20,
    },
    modalRoot: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
    },
    popupContainer: {
        alignItems: 'center',
        borderRadius: 20,
        display: 'flex',
        elevation: 20,
        flexDirection: 'column',
        height: 310,
        justifyContent: 'space-between',
        paddingVertical: 30,
        width: 260,
    },
    scanMeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export const AccountScreensStyles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        height: 60,
        width: screenWidth * 0.90,
        zIndex: 2,
    },
    pfpStack: {
        height: 160,
        marginBottom: 40,
        marginTop: 60,
        width: 160,
    },
    pfpContainer: {
        alignItems: 'center',
        borderRadius: 80,
        display: 'flex',
        height: 160,
        justifyContent: 'center',
        position: 'absolute',
        width: 160,
    },
    pfpEditBtn: {
        alignItems: 'center',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        height: 40,
        position: 'absolute',
        right: 0,
        top: 120,
        width: 40,
        zIndex: 2,
    },
    modalRootContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        margin: 0,
        padding: 0,
    },
    removeFriendContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        width: screenWidth * 0.8,
    },
    removeFriendText: {
        fontSize: 17,
        fontWeight: 'bold',
        width: screenWidth * 0.5,
    },
});

export const ChatScreenStyles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        width: screenWidth * 0.90,
        zIndex: 2,
    },
    displayNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        width: screenWidth * 0.50,
    },
    textInputContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        width: screenWidth * 0.9,
    },
    textInput: {
        borderWidth: 2,
        borderRadius: 25,
        height: 50,        
        paddingHorizontal: 25,
        paddingVertical: 0,
        width: screenWidth * 0.76,
    },
    sendBtn: {
        alignItems: 'center',
        borderRadius: 20,
        display: 'flex',
        elevation: 5,
        justifyContent: 'center',
        height: 40,
        width: 40,
    },
});
