import { SET_USER } from '../actions/userActionTypes'

const userReducer = (state = {}, action) => {

    switch (action.type) {
        case SET_USER:
            return action.user
        default:
            return state
    }
}

export default userReducer