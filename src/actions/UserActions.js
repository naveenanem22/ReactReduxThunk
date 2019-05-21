import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, FETCH_ENGINEERS_SUCCESS, FETCH_ENGINEERS, FETCH_ENGINEERS_FAILURE } from './ActionTypes';
export const UPDATE_USER = "users:updateUser";


export function updateUser(newUser) {

    return {
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
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
            firstName:engineer.userName+' '+'First Name',
            lastName: engineer.userName+' '+'Last Name',
            userName:engineer.userName
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

                    dispatch(loginSuccess({
                        role: jsonResp.role,
                        username: jsonResp.username
                    }));
                }
            });
    };
}