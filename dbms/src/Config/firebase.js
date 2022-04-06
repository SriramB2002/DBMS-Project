// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXn4XkHykXBUbpy9-TuSTJnQg9y7ZM7Is",
  authDomain: "dbms-4e28c.firebaseapp.com",
  projectId: "dbms-4e28c",
  storageBucket: "dbms-4e28c.appspot.com",
  messagingSenderId: "335106095083",
  appId: "1:335106095083:web:7423103309e512d3d28bae",
  measurementId: "G-F3Z53EP9TL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);