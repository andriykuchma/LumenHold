import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDQmtGM_yztFXut0PIfIKnbgen664i9VIM",
  authDomain: "lumenhold.firebaseapp.com",
  projectId: "lumenhold",
  storageBucket: "lumenhold.appspot.com",
  messagingSenderId: "576388284631",
  appId: "1:576388284631:web:1c582c46dffba221837092"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
