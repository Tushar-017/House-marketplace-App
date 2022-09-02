import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB6PEtb_-CEJ5snfXWCReMC6AbX_w8Jczk",
  authDomain: "house-marketplace-app-413c8.firebaseapp.com",
  projectId: "house-marketplace-app-413c8",
  storageBucket: "house-marketplace-app-413c8.appspot.com",
  messagingSenderId: "664666398671",
  appId: "1:664666398671:web:39397cc6d4b5fbdc0d7cba"
};

// const app is useless here we only need to initializeApp
export const app = initializeApp(firebaseConfig);

export const db = getFirestore()