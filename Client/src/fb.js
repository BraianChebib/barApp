// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaodPxmwRtU6cApdooe7Op0ArU9yubkYo",
  authDomain: "barapp-f9f85.firebaseapp.com",
  projectId: "barapp-f9f85",
  storageBucket: "barapp-f9f85.appspot.com",
  messagingSenderId: "619388811313",
  appId: "1:619388811313:web:50e7efabd30471c30e3d10",
  measurementId: "G-ETG476VP85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 

export default app;