// Importa las funciones que necesitas de los SDKs que necesitas
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // Si usas Analytics
import { getFirestore } from "firebase/firestore"; // Si usas Firestore

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD84FM3pkir_3jhdE6xphnSifBpYiNHbYo",
  authDomain: "coffeck-8793a.firebaseapp.com",
  projectId: "coffeck-8793a",
  storageBucket: "coffeck-8793a.firebasestorage.app",
  messagingSenderId: "860096996756",
  appId: "1:860096996756:web:c9ccbbbfab22eae24a5b81",
  measurementId: "G-BNNSNKB5HD"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Solo inicializa analytics si measurementId está presente
let analytics;
if (firebaseConfig.measurementId) {
  analytics = getAnalytics(app);
}

const db = getFirestore(app); // Inicializa Firestore

// Exporta los servicios que vayas a usar
export { app, analytics, db }; // Exporta 'app', 'analytics' y 'db' (Firestore)