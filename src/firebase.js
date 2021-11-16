// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDYIjjOVYsO9A5Y5_n28ElSSWRsQUB4gT4",
  authDomain: "reels-908f2.firebaseapp.com",
  projectId: "reels-908f2",
  storageBucket: "reels-908f2.appspot.com",
  messagingSenderId: "623243626476",
  appId: "1:623243626476:web:40bca55537dcf9d66c22c9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth();

const firestore=firebase.firestore();

export const database={
    users:firestore.collection("users"),
    getTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}


export const storage=firebase.storage();