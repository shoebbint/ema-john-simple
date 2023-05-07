// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLh3IU8p7W5JyhR1GMYXlCCUHQeMwrBAE",
  authDomain: "ema-john-simple-6e7cc.firebaseapp.com",
  projectId: "ema-john-simple-6e7cc",
  storageBucket: "ema-john-simple-6e7cc.appspot.com",
  messagingSenderId: "1080540930798",
  appId: "1:1080540930798:web:924ff703d8862bc0ee49ff",
  measurementId: "G-W9R70L8RS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth=getAuth(app);

export default auth;