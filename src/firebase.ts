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

export default app;
