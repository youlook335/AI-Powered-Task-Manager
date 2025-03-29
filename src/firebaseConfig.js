// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAFho3WN3lrIPMrWejdgmBfZQdeqxeb6Uc",
//   authDomain: "ai-powered-task-manager-92428.firebaseapp.com",
//   projectId: "ai-powered-task-manager-92428",
//   storageBucket: "ai-powered-task-manager-92428.firebasestorage.app",
//   messagingSenderId: "1023964189276",
//   appId: "1:1023964189276:web:866b665306fce13ec3cc99",
//   measurementId: "G-2N4FNN8TNH"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFho3WN3lrIPMrWejdgmBfZQdeqxeb6Uc",
  authDomain: "ai-powered-task-manager-92428.firebaseapp.com",
  projectId: "ai-powered-task-manager-92428",
  storageBucket: "ai-powered-task-manager-92428.firebasestorage.app",
  messagingSenderId: "1023964189276",
  appId: "1:1023964189276:web:866b665306fce13ec3cc99",
  measurementId: "G-2N4FNN8TNH"
};

// Firebase کو Initialize کرو
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
