import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCB9YeUS44AjVQkfdDLPGHLmubkFlVbNmA",
  authDomain: "discorde-clone-practice.firebaseapp.com",
  projectId: "discorde-clone-practice",
  storageBucket: "discorde-clone-practice.appspot.com",
  messagingSenderId: "479123415080",
  appId: "1:479123415080:web:3e5ba843e120d3e3f9d51d",
  measurementId: "G-9PH4XWV1YM"
};

const app = initializeApp(firebaseConfig);
// getFirestore(app) で db のインスタンスを作成
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };