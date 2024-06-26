
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDxJSazrN065MCKTqbjUg3e4A05lzFoPEA",
  authDomain: "virtualmap-2e6fc.firebaseapp.com",
  projectId: "virtualmap-2e6fc",
  storageBucket: "virtualmap-2e6fc.appspot.com",
  messagingSenderId: "493191196257",
  appId: "1:493191196257:web:ebe5f7192f91097da04420",
  measurementId: "G-KN46DYFVGZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

