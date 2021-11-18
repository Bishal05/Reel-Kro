// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

let object=require("./secret");
// Initialize Firebase
firebase.initializeApp(object);

export const auth=firebase.auth();

const firestore=firebase.firestore();

export const database={
    users:firestore.collection("users"),
    posts:firestore.collection("posts"),
    comments:firestore.collection("comments"),
    getTimeStamp:firebase.firestore.FieldValue.serverTimestamp
}


export const storage=firebase.storage();