import { initializeApp } from "firebase/app";

import {
  getFirestore,
} from "firebase/firestore";

import {
  getStorage,
} from "firebase/storage";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-W-UFOsmjeUmbEe_iPKnzIvJ3KxChkJ8",
  authDomain: "smm-planner-55c72.firebaseapp.com",
  projectId: "smm-planner-55c72",
  storageBucket: "smm-planner-55c72.firebasestorage.app",
  messagingSenderId: "707460806004",
  appId: "1:707460806004:web:ec3ffd151df8aebe58a821",
  measurementId: "G-YGK4ZCJTYD"

};

const app =
  initializeApp(
    firebaseConfig
  );

export const db =
  getFirestore(app);

export const storage =
  getStorage(app);

export const auth =
  getAuth(app);

export const provider =
  new GoogleAuthProvider();