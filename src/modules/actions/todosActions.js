
function addTodo(item) {
    return dispatch => {
        dispatch({ type: 'ADD_NEW_TODO', payload: item })
    }
}

function deleteTodo(id) {
    return dispatch => {
        dispatch({ type: 'DELETE_TODO', payload: id })
    }
}

function editTodo(item) {
    return dispatch => {
        dispatch({ type: 'EDIT_TODO', payload: item })
    }
}

export default {
    addTodo,
    deleteTodo,
    editTodo
}