import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    headingText: {
        alignSelf: 'center',
        textTransform: 'uppercase', 
        fontSize: 22,
        marginBottom: 10
    },
    todosText: {
        fontSize: 16,
        marginTop: 10
    },
    addTodoBtn: {
        backgroundColor: "#78B7BB",
        color: "#fff",
        padding: 5, 
    },
    searchWrapper: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchInput: {
        borderBottomWidth: 1,
        paddingVertical: 0
    }
})