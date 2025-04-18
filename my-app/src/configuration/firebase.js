import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyARaGNrzw-hBCyCOvoMq1ITTaTieXGJx9Y",
  authDomain: "todolist-11db7.firebaseapp.com",
  projectId: "todolist-11db7",
  storageBucket: "todolist-11db7.firebasestorage.app",
  messagingSenderId: "364049816645",
  appId: "1:364049816645:web:af2b35c3f76663b83f172c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
