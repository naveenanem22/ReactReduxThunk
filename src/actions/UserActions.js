import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FETCH_ENGINEERS_SUCCESS, FETCH_ENGINEERS, FETCH_ENGINEERS_FAILURE, LOGIN, GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE } from './ActionTypes';

export const UPDATE_USER = "users:updateUser";



export function updateUser(newUser) {

    return {
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
    }
}

export function login() {
    return {
        type: LOGIN
    }
}

export function loginSuccess(user) {

    return {
        type: LOGIN_SUCCESS,
        payload: {
            user: user
        }
    }
}

export function loginFailure() {

    return {
        type: LOGIN_FAILURE
    }
}

export function getProfile() {
    return {
        type: GET_PROFILE
    }
}

export function getProfileSuccess(employee) {

    return {
        type: GET_PROFILE_SUCCESS,
        payload: {
            profile: employee
        }
    }
}

export function getProfileFailure() {

    return {
        type: GET_PROFILE_FAILURE
    }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT
    }
}

export function fetchEngineers() {
    return {
        type: FETCH_ENGINEERS
    }

}

export function fetchEngineersSuccess(engineerList) {
    //Processing engineerList raw response
    var engineers = [];
    engineerList.forEach(engineer => {
        engineers.push({
            firstName: engineer.firstName,
            lastName: engineer.lastName,
            userName: engineer.userName
        })
    })
    return {
        type: FETCH_ENGINEERS_SUCCESS,
        payload: {
            engineers: engineers
        }
    }
}

export function fetchEngineersFailure() {
    return {
        type: FETCH_ENGINEERS_FAILURE
    }


}

export function fetchEngineersAPICall(queryParams) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL("http://localhost:8080/v0/user-management/users");
    var params = { roleName: queryParams.roleName };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    return function (dispatch) {
        dispatch(fetchEngineers());
        return fetch(url, {
            method: 'GET',
            headers: headers
        })
            .then(
                response => {
                    if (response.status === 200)
                        return response.json();
                },
                error => console.log('An error occurred.', error),
            )
            .then((engineers) => {
                console.log("Engineers fetched: " + engineers);
                dispatch(fetchEngineersSuccess(engineers));
            },
            );
    };
}

export function loginAPICall(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return function (dispatch) {
        dispatch(login());
        return fetch(`http://localhost:8080/auth/login`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                username: user.userId,
                password: user.password
            })
        })
            .then(
                response => {
                    console.log("response from login: " + response);
                    if (response.status === 200) {
                        return response.json();
                    }
                    else
                        dispatch(loginFailure());
                },
                error => {
                    console.log('An error occurred.', error);
                    dispatch(loginFailure());
                }
            ).then(jsonResp => {
                if (jsonResp) {
                    localStorage.setItem('token', jsonResp.token);
                    localStorage.setItem('role', jsonResp.role);
                    localStorage.setItem('username', jsonResp.username);
                    localStorage.setItem('employeeId', jsonResp.employeeId)

                    dispatch(loginSuccess({
                        role: jsonResp.role,
                        username: jsonResp.username
                    }));
                }
            });
    };
}

export function getProfileAPICall(params) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL("http://localhost:8080/v0/profile-management/employees/" + params.employeeId);

    return function (dispatch) {
        dispatch(getProfile());
        return fetch(url, {
            method: 'GET',
            headers: headers
        })
            .then(
                response => {
                    if (response.status === 200)
                        return response.json();
                    if (response.status === 500)
                        dispatch(getProfileFailure());
                },
                error => console.log('An error occurred.', error),
            )
            .then((employee) => {
                console.log("Employee fetched: " + employee);
                dispatch(getProfileSuccess(employee));
            },
            );
    };
}