import { basePath } from './config';

export function newUserApi(user) {
    const url = `${basePath}/sign-up`;
    
    const params = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        //Authorization: token,
        'Content-Type': 'application/json'
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .catch(err => {
        return err.message;
      });
}

export function loginApi(user) {
    const url = `${basePath}/login`;
    const params = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .catch(err => {
        return err.message;
      });
  }