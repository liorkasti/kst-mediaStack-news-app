import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { FIREBASE_CONFIG } from "./firebase.config";

firebase.initializeApp(FIREBASE_CONFIG);

const config = {
  apiKey: "AIzaSyCxmVgy6lTTHnDZfr_UAlZEhFxUW_h79oM",
  authDomain: "jstay-bnb.firebaseapp.com",
  databaseURL: "https://jstay-bnb.firebaseio.com",
  projectId: "jstay-bnb",
  messagingSenderId: "89366999796",
  appId: "1:89366999796:web:3db60bcb3fa87df6a5e4a1",
  measurementId: "G-DB2GY4PCJQ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const facebook = () => auth.facebook(provider);

export default firebase;
