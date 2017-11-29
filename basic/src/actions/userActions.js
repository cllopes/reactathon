import { SET_USER } from 'userActionTypes'

export const setUser = user => {
    return {
        type: SET_USER,
        user
    }
}