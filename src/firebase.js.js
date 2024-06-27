

// src/firebase.js
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpdrhHBB85jCU3f7cF7luTEOkbZY03DW4",
  authDomain: "panoramic-map.firebaseapp.com",
  projectId: "panoramic-map",
  storageBucket: "panoramic-map.appspot.com",
  messagingSenderId: "119113460245",
  appId: "1:119113460245:web:53b5e47ef06d3665747c1c",
  measurementId: "G-ZGC40K6VXL"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
