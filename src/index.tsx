import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDxGeRlnsizPn-A3KUx6y6HPif602aOFtM",
  authDomain: "movie-star-py.firebaseapp.com",
  databaseURL: "https://movie-star-py.firebaseio.com",
  projectId: "movie-star-py",
  storageBucket: "movie-star-py.appspot.com",
  messagingSenderId: "587247640415",
  appId: "1:587247640415:web:1a03e79360b679398ae0ea",
  measurementId: "G-XQB7CVNQS4",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
