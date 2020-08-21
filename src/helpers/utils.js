export function getFormBody(params) {
    let formBody = [];
    for (let property in params) {
      // encodeURIComponent is userd for convert data in url format eg: 'user name' => 'user%20name'
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  export function getAuthTokenFromLocalStorage() {
    return localStorage.getItem('token');
  }