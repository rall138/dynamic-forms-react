import { combineReducers } from 'redux'
import selectionReducer from './selectionReducer'

const allReducers = combineReducers({
    selection: selectionReducer
})

export default allReducers;