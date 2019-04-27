import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    textInput: {
        height: 20,
        padding: 0,
        marginLeft: 5,
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    confirmBtn: {
        marginTop: 15,
        backgroundColor: 'orange',
        borderRadius: 5
    },
    btnText: {
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})