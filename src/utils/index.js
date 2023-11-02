// import { API_URLS } from "./constants";

// export {
//   API_URLS
// }

export * from './constants';

export const setItemInLocalStroage = (key, value) =>{

   if(!value || !key) {
   return console.error('can not store in local storage');
  }

const valueToStore = typeof value !== 'string' ? JSON.stringify(value) : value;

//console.log('valueToStore', valueToStore)
localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStroage = (key) =>{

   if(!key) {
   return console.error('can not get the key value from the stroage');
  }

return localStorage.getItem(key);
};

export const removeItemFromLocalStroage = (key) =>{

  if(!key) {
    return console.error('can not get the key value from the stroage');
   }

localStorage.removeItem(key);
};

export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); // 'username=aakash&password=123213'
};
