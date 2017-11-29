import { createStore, combineReducers } from 'redux'

import userReducer from '../reducers/userReducer'
import profileReducer from '../reducers/profileReducer'

const rootReducer = combineReducers({user: userReducer, profile: profileReducer})

export default () => {
    const store = createStore(rootReducer)
    return store
}


