"use strict";

class util {

  static createAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    for (let key in options) {
      if (key === "txt") {
        elem.innerText = options.txt;
      } else {
        elem.setAttribute(key, options[key]);
      }
    }
    return elem;
  }

  static fetchJSON(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "json";
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
        }
      }
      xhr.onerror = () => reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      xhr.send();
    });
  }

  static postJSON(url, data, type) {
    // type can be "x-www-form-urlencoded" or "json"
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/" + type);
      xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
        }
      }
      xhr.onerror = () => reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      xhr.send(data);
    });
  }

}
