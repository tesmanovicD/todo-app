const ADD_NEW_TODO = 'ADD_NEW_TODO'
const DELETE_TODO = 'DELETE_TODO'

const initialState = {
    todos: [{title: "zec"}],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_NEW_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload.item]
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(t => t.id !== action.payload.id)
            }
        default:
            return state
    }
}