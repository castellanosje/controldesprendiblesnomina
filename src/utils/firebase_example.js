import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "--",
    authDomain: "--",
    projectId: "--",
    storageBucket: "--",
    messagingSenderId: "--",
    appId: "--"
  };

  firebase.initializeApp(firebaseConfig);

  //Utils
  const auth = firebase.auth();
  const storage = firebase.storage();
  const db = firebase.firestore();

  export { auth, storage, db };