// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQmtGM_yztFXut0PIfIKnbgen664i9VIM",
    authDomain: "lumenhold.firebaseapp.com",
    projectId: "lumenhold",
    storageBucket: "lumenhold.appspot.com",
    messagingSenderId: "576388284631",
    appId: "1:576388284631:web:1c582c46dffba221837092"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); // Initialize the authentication service
const db = getFirestore(firebaseApp); // Initialize the Firestore database service

export { auth, db };
