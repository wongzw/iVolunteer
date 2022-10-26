import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig.json";
import { getFirestore } from "firebase/firestore";
import 'firebase/storage'

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);