
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMKQH83gq-7tFT9-I3kTvrJNJEJE2t4TA",
  authDomain: "booklibrary-86381.firebaseapp.com",
  databaseURL: "https://booklibrary-86381-default-rtdb.firebaseio.com",
  projectId: "booklibrary-86381",
  storageBucket: "booklibrary-86381.appspot.com",
  messagingSenderId: "49992018878",
  appId: "1:49992018878:web:2d20233f2687d3cae167ef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();


