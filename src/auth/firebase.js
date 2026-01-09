import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Placeholder check to prevent crash on initial mount
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const isConfigPlaceholder = firebaseConfig.apiKey.startsWith("YOUR_");

let app;
let auth;
let googleProvider;
let db;

if (!isConfigPlaceholder) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        googleProvider = new GoogleAuthProvider();
        db = getFirestore(app);
    } catch (error) {
        console.error("Firebase Initialization Error:", error);
    }
} else {
    console.warn("Firebase is running with placeholder credentials. Authentication will not work until actual credentials are added to src/auth/firebase.js");
}

export { auth, googleProvider, db };
export default app;
