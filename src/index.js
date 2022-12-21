import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import { BrowserRouter } from "react-router-dom";

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
          if (res.accessToken && res.accessToken !== "") {
            localStorage.setItem("accessToken", res.accessToken);
            return axios(err.config);
          } else {
            window.location = "/login"
          }
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
          if (res.accessToken && res.accessToken !== "") {
            localStorage.setItem("accessToken", res.accessToken);
            return axios(err.config);
          } else {
            window.location = "/login"
          }
        })
      resolve(response);
    } else {
      return Promise.reject(err);
    }
  })
);

axios.defaults.baseURL = "/";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
