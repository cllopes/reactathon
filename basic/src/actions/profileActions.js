import { SET_PROFILE } from './profileActionTypes'

export const setProfile = profile => {
    return {
        type: SET_PROFILE,
        profile
    }
}