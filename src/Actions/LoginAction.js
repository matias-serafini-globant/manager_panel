import { AUTHENTICATED, USERS, GET_USER, DELETE_USER, RESET_STORE } from '../Constants';
import apiService from '../lib/apiService/apiService'

export const userAuth = token => {
    return {
        type: AUTHENTICATED,
        token
    }
}
export const userList = data => {
    return {
        type: USERS,
        data
    }
}
export const getUser = data => {
    return {
        type: GET_USER,
        data
    }
}
export const deleteUser = id => {
    return {
        type: DELETE_USER,
        id
    }
}
export const resetStore = () => {
    return {
        type: RESET_STORE
    }
}
export const deleteUserForId = id => {
    return dispatch => {
        apiService('DELETE', '/user/id?id=' + id)
            .then((res) => {
                if (res) {
                    dispatch(deleteUser(id))
                } else {
                    return 'error'
                }
            })
    }
}

export const getUserForId = id => {
    return dispatch => {
        if (Number.isInteger(id)) {
            apiService('GET', '/user/id?id=' + id).
                then((res) => {
                    dispatch(getUser(res))
                    console.log(res, "DESDE GET USER FOR ID")
                })
                .catch(() => {
                    console.log("Error 404")
                })
        }
    }
}
export const userGet = () => {
    return dispatch => {
        apiService('GET', '/user/all').
            then((res) => {
                dispatch(userList(res))
                console.log(res, "DESDE USERGET")
            })
            .catch(() => {
                console.log("Error 404")
            })
    }
}
export const loginGet = data => {
    return dispatch => {
        apiService('POST', '/login', data)
            .then((res) => {
                if (res.status === 400 || res.status === 401 || res.status === 500) {
                    console.log('Error: ', res.message)
                } else {
                    console.log(res, "DESDE LOGIN GET")
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('userId', res.data.userId)
                    localStorage.setItem('userMail', res.data.email)
                    localStorage.setItem('userName', res.data.name)
                    localStorage.setItem('userRolId', res.data.rol_id)
                    const token = localStorage.getItem('token');
                    dispatch(userAuth(token))
                }
            })
            .catch(function (reason) {
                console.error(reason);
            });
    }
};

