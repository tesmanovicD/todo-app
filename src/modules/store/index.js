import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import todos from '../reducers/todosReducer'


const rootReducer = combineReducers({
    todos
})

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk)
    )
)

export default store