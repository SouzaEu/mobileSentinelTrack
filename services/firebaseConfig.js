import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQN9-zZhUAorhl1Y-NLdvye1Wv-BFQ3YY",
  authDomain: "lynex-2256a.firebaseapp.com",
  projectId: "lynex-2256a",
  storageBucket: "lynex-2256a.firebasestorage.app",
  messagingSenderId: "507213424216",
  appId: "1:507213424216:web:51d71b3a3309e7ff3a4c2d",
  measurementId: "G-9GDLMQ6B9H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);