// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvH4t9spX-8jQGFuaJYJHBpWVr0iGekCc",
  authDomain: "projectthreereactappamiibo.firebaseapp.com",
  databaseURL: "https://projectthreereactappamiibo-default-rtdb.firebaseio.com",
  projectId: "projectthreereactappamiibo",
  storageBucket: "projectthreereactappamiibo.appspot.com",
  messagingSenderId: "1071369430228",
  appId: "1:1071369430228:web:a86d2b2434f71db9658741"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;