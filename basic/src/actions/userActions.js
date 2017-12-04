import { SET_USER } from './userActionTypes'
import { login } from '../services/userService'

export const setUser = user => {
    return {
        type: SET_USER,
        user
    }
}



function setCats(cats) {
    return {
        type: 'SET_CATS',
        cats
    }
}

function loadCats(catType) {
    return async function (dispatch) {
        const cats = await loadCatsofType(type)
        dispatch(setCats(cats))
    }
}

/*const setCats = cats => {
    return {
        type: 'SET_CATS',
        cats
    }
}

const loadCats = catType => async dispatch => {
    const cats = await loadCatsofType(type)
    dispatch(setCats(cats))
}*/



export const loginUser = (userName, password) => async dispatch => {
    try {
        const user = await login(userName, password)
        user.isAuthenticated = true
        dispatch(setUser(user))
    } catch (e) {
        // Error handle incorrect user password, locked out users etc...
    }
}



