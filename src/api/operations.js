import { basePath } from './config';

export function getOperationsApi(token, userId) {

    const url = `${basePath}/operations/${userId}`;
  
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: token,
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


export function newOperationApi(token, operation) {
    const url = `${basePath}/operations`;
    
    const params = {
      method: "POST",
      body: JSON.stringify(operation),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result.message;
      })
      .catch(err => {
        return err.message;
      });
}


export function updateOperationApi(token, operation, operationId){
    const url = `${basePath}/operations/update/${operationId}`;

    const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(operation)
      };
    
      return fetch(url, params)
        .then(response => {
          return response.json();
        })
        .then(result => {
          return result;
        })
        .catch(err => {
          return err.message;
        });

}

export function deleteOperationApi(token, operationId) {
    const url = `${basePath}/operations/delete/${operationId}`;
  
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result.message;
      })
      .catch(err => {
        return err.message;
      });
}


export function getOperationsByIdApi(token, operationId) {
    const url = `${basePath}/operations/get/${operationId}`
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    };
  
    return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}


export function getUsersPricesApi(token, type, userId) {
    const url = `${basePath}/operations/prices/${userId}?type=${type}`;
  
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => {
        return err.message;
      });
  }