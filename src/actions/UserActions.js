import {LOGIN_SUCCESS, LOGIN_FAILURE} from './ActionTypes';
export const UPDATE_USER = "users:updateUser";
 

export function updateUser(newUser){
    
    return {
        type : UPDATE_USER,
        payload : {
            user: newUser
        }
    }
}

export function loginSuccess(){
    
    return {
        type : LOGIN_SUCCESS
    }
}

export function loginFailure(){
    
    return {
        type : LOGIN_FAILURE
    }
}

export function loginAPICall(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return function (dispatch) {      
        return fetch(`http://localhost:8080/auth/login`,{
            method : 'POST',
            headers: headers,
            body : JSON.stringify({
                username: 'mike',
                password: '234'
            })            
        })
        .then(
           response => {
               console.log("response from login: "+response);
               if(response.status === 200){
                   return response.json();
                               
               }
           },
           error => {
            console.log('An error occurred.', error);
            dispatch(loginFailure());
           }
       ).then(jsonResp => {
           console.log(jsonResp);
           localStorage.setItem('token',jsonResp.token);
           dispatch(loginSuccess());
       });
      };
}

