export function getValueByKey(arr, key){
    var result = '';
    for(var i=0;i<arr.length;i++){
    
      var keysArr = Object.keys(arr[i]);
      var valuesArr = Object.values(arr[i]);
      
      if(keysArr[0] == key){
            result=valuesArr[0];          
           break;
      }         
    }

    return result;
 }