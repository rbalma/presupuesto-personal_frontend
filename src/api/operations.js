import { basePath } from './config';

export function getOperationsApi() {

    const url = `${basePath}/operations`;
  
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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


export function newOperationApi(operation) {
    const url = `${basePath}/operations`;
    
    const params = {
      method: "POST",
      body: JSON.stringify(operation),
      headers: {
        //Authorization: token,
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


export function updateOperationApi(operation, operationId){
    const url = `${basePath}/operations/update/${operationId}`;

    const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          //Authorization: token
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

export function deleteOperationApi(operationId) {
    const url = `${basePath}/operations/delete/${operationId}`;
  
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //Authorization: token
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


export function getOperationsByIdApi(operationId) {
    const url = `${basePath}/operations/get/${operationId}`
    const params = {
      method: "GET"
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


export function getUsersPricesApi(type) {
    const url = `${basePath}/operations/prices?type=${type}`;
  
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: token
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