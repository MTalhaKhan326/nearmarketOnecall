// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATBfNLiYtyA5CYzl2L-Y9Yc-LUSnGcCQM",
    authDomain: "one-call-59851.firebaseapp.com",
    databaseURL: "https://one-call-59851.firebaseio.com",
    projectId: "one-call-59851",
    storageBucket: "one-call-59851.appspot.com",
    messagingSenderId: "962461584827",
    appId: "1:962461584827:web:3a97dc0d54c4e5006e889e",
    measurementId: "G-0LF3SPVK62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const storage = getStorage(app)

const firebase_service = {
    db, storage
}

export default firebase_service