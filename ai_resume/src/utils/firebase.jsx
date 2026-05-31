
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyCbz7_J8CdJeh35kboQCuHDXnCXum9-z0Y",
authDomain: "ai-resume-mern.firebaseapp.com",
projectId: "ai-resume-mern",
storageBucket: "ai-resume-mern.firebasestorage.app",
messagingSenderId: "1040481340625",
appId: "1:1040481340625:web:84aaafa2b3ea7e0f6ac9f0",
measurementId: "G-G1CL4G5FML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };