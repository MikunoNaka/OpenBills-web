import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

// For GET requests
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = token;
    return config;
  },
  err => new Promise((resolve) => {
    if (err.response && err.response.status === 401) {
      err.config._retry = true;

      const response = fetch("/auth/refresh", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("accessToken", res.accessToken);
          return axios(err.config);
        })
      resolve(response);
    } else {
      return Promise.reject(err);
    }
  })
);

// For POST requests
axios.interceptors.response.use(
  config => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = token;
    return config;
  },
  err => new Promise((resolve) => {
    if (err.response && err.response.status === 401 && err.config.url !== "/auth/login") {
      err.config._retry = true;

      const response = fetch("/auth/refresh", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("accessToken", res.accessToken);
          return axios(err.config);
        })
      resolve(response);
    } else {
      return Promise.reject(err);
    }
  })
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
