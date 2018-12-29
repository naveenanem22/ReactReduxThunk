import {ADD_PRODUCT} from '../actions/ActionTypes';

export function productReducer(state = [], action){
    switch(action.type){
        case ADD_PRODUCT:               
        return state.concat(action.payload.product);

        default :
        return state;
    }
}





