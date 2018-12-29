import { ADD_PRODUCT } from './ActionTypes';
import { GET_PRODUCT } from './ActionTypes';

export function addProduct(newProduct){
    return {
        type : ADD_PRODUCT,
        payload : {
            product: newProduct
        }
    }
}

export function getProduct(){
    return {
        type : GET_PRODUCT,
        payload : {             
            product : {

            }
        }
    }
}


export function getProductsAPICall() {
    return function (dispatch) {      
      fetch(`https://73fb348e-a09c-48df-8997-657865e275bc.mock.pstmn.io/headers`)
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error),
     )
      .then((json) => {
          console.log(json);
         dispatch(addProduct({name: json.headers.host}));
      },
     );
    };


    
   }