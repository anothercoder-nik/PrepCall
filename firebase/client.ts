import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBKD0KcfNr_V864fgflAsaJVoPMzkFqGlU",
  authDomain: "finalcall-ae06e.firebaseapp.com",
  projectId: "finalcall-ae06e",
  storageBucket: "finalcall-ae06e.firebasestorage.app",
  messagingSenderId: "344104396180",
  appId: "1:344104396180:web:67e5ddb4ff028632099b81",
  measurementId: "G-2C75HXV2HD"
};
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)