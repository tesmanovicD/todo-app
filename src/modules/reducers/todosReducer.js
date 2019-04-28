const ADD_NEW_TODO = 'ADD_NEW_TODO'
const DELETE_TODO = 'DELETE_TODO'

const initialState = {
    lastId: 0,
    todos: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_NEW_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
                lastId: state.lastId + 1
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(t => t.id !== action.payload)
            }
        default:
            return state
    }
}