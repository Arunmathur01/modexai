// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "modexai-b128b.firebaseapp.com",
  projectId: "modexai-b128b",
  storageBucket: "modexai-b128b.firebasestorage.app",
  messagingSenderId: "412644605932",
  appId: "1:412644605932:web:c351903b490d553e594ac9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };