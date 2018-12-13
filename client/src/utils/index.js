import "whatwg-fetch";
import { config } from "../config";

const serverURL = config.serverURL;

export const callApi = (url, data, method) => {
  console.log("Calling API... " + url);
  return new Promise(function(resolve, reject) {
    let options = {
      method: method || "GET",
      mode: "cors",
      redirect: "follow",
      compress: true,
      credentials: "include"
    };
    if (method === "POST") {
      options.body = JSON.stringify(data);
      options.headers = {};
      options.headers.Accept = "application/json";
      options.headers["Content-Type"] = "application/json";
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

export const callCustomApi = (url, data, method) => {
  console.log("Calling API... " + url);
  return new Promise(function(resolve, reject) {
    let options = {
      method: method || "GET",
      mode: "cors",
      redirect: "follow",
      compress: true,
      credentials: "include"
    };
    if (method === "POST") {
      options.body = JSON.stringify(data);
      options.headers = {};
      options.headers.Accept = "application/json";
      options.headers["Content-Type"] = "application/json";
    }
    fetch(`${serverURL}${url}`, options)
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

export const fileUpload = data => {
  let file = new FormData();
  console.log(data);
  file.append("file", data.file);
  file.append("name", data.fileName);
  console.log(file);
  console.log("Uploading file");
  return new Promise(function(resolve, reject) {
    let options = {
      method: "POST",
      mode: "cors",
      redirect: "follow",
      credentials: "include",
      body: file
    };
    fetch(`${serverURL}api/uploadFile`, options)
      .then(res => {
        if (res.ok) return res.json();
        reject(new Error(res.statusText));
      })
      .then(data => resolve(data))
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const downloadFile = (data, fileName) => {
  return new Promise(function(resolve, reject) {
    let options = {
      method: "GET",
      mode: "cors",
      redirect: "follow",
      credentials: "include"
    };
    fetch(`${serverURL}api/downloadFile/${data}`, options)
      .then(res => {
        if (res.ok) {
          return res.blob();
        }
        reject(new Error(res.statusText));
      })
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove();
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};
