import { SET_PROFILE } from '../actions/profileActionTypes'

const mockProfile = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jsmith@jonahgroup.com'
}

const profileReducer = (state = mockProfile, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return action.user
        default:
            return state
    }
}

export default profileReducer