const ADD_NEW_TODO = 'ADD_NEW_TODO'
const DELETE_TODO = 'DELETE_TODO'
const EDIT_TODO = 'EDIT_TODO'

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
        case EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(item => {
                    if (item.id == action.payload.id) {
                        return {
                            ...item,
                            title: action.payload.title,
                            description: action.payload.description,
                            createdAt: action.payload.createdAt
                        }
                    }
                    return item
                })
            }
        default:
            return state
    }
}