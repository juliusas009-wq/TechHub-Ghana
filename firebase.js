// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_F9beW6D-KknUhXaeRq19c3M-Ny6UkDA",
  authDomain: "techhub-ghana.firebaseapp.com",
  projectId: "techhub-ghana",
  storageBucket: "techhub-ghana.firebasestorage.app",
  messagingSenderId: "353923734066",
  appId: "1:353923734066:web:342419bf65c6bff5a73a2b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };