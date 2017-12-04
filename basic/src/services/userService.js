import axios from 'axios'

export const login = async (username, password) => {
    const result = await axios({
        url: 'http://localhost:8080/account/login',
        method: 'get',
        auth: {
            username,
            password
        },
    });

    return result.data
}