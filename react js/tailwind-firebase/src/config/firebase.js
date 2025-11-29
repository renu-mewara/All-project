// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWMLks3JSMJ9kpmHbymPG5h2sxYxQi5YA",
  authDomain: "wsb-169.firebaseapp.com",
  databaseURL: "https://wsb-169-default-rtdb.firebaseio.com",
  projectId: "wsb-169",
  storageBucket: "wsb-169.firebasestorage.app",
  messagingSenderId: "377013342983",
  appId: "1:377013342983:web:a12c7b1643ff8b4537eba2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;