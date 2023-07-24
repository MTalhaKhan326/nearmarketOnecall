// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  getDownloadURL,
  ref as firebase_ref,
  uploadBytesResumable,
} from "firebase/storage";

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
  measurementId: "G-0LF3SPVK62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

async function uploadFileOnFirebase(
  args = {
    filename: null,
    file: null,
  }
) {
  const { filename, file } = args;
  if (!filename || !file) throw new Error("filename and file are required");
  if (typeof filename !== "string") throw new Error("filename must be string");
  if (!file instanceof File) throw new Error("file must be instance of File");
  const ref = firebase_ref(storage, filename);
  const uploadTask = uploadBytesResumable(ref, file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      () => {},
      (err) => reject(err),
      () => resolve(getDownloadURL(uploadTask.snapshot.ref))
    );
  });
}

async function uploadManyFilesOnFirebase(
  args = {
    files: [],
    foldername: null,
  }
) {
  const { files, foldername } = args;
  if (!files.length) throw new Error("files cannot be empty");
  files.map((file) => {
    if (!file instanceof File) {
      throw new Error("files must be an array of File objects");
    }
    return null;
  });
  if (!foldername) throw new Error("foldername is required");
  if (typeof foldername !== "string")
    throw new Error("foldername must be string");
  return Promise.all(
    files.map((file) =>
      uploadFileOnFirebase({
        file: file,
        filename: `${foldername}/${
          file.name
        }-${Date.now()}.${file.name.substring(file.name.lastIndexOf(".") + 1)}`,
      })
    )
  );
}

const firebase_service = {
  db,
  storage,
  uploadFileOnFirebase,
  uploadManyFilesOnFirebase,
};

export default firebase_service;
