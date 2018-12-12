import 'whatwg-fetch';
import {config} from '../config'

const serverURL = config.serverURL

export const callApi = (url, data, method) => {
  console.log('Calling API... ' + url);
  return new Promise(function(resolve, reject) {
    let options = {
      method: method || 'GET',
      mode: 'cors',
      redirect: 'follow',
      compress: true,
      credentials: 'include',
    };
    if (method === 'POST') {
      options.body = JSON.stringify(data);
      options.headers = {};
      options.headers.Accept = 'application/json';
      options.headers['Content-Type'] = 'application/json';
    }
    fetch(`${serverURL}api${url}`, options)
      .then(res => {
        if (res.ok) return res.json();
        reject(new Error(res.statusText));
      })
      .then(data => resolve(data))
      .catch(err => {
        reject(err);
      });
  });
};
