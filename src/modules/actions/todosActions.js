
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

export default {
    addTodo,
    deleteTodo
}