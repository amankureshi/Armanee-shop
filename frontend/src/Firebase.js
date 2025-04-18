// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUcE6QMB7eIZS86gGEjRjd81pymRznFds",
  authDomain: "armanee-shop.firebaseapp.com",
  projectId: "armanee-shop",
  storageBucket: "armanee-shop.firebasestorage.app",
  messagingSenderId: "570528111071",
  appId: "1:570528111071:web:f600168f1b2cac1b0a8c6a",
  measurementId: "G-5JHN6TT6TL",
  databaseUrl:
    "https://console.firebase.google.com/u/0/project/armanee-shop/database/armanee-shop-default-rtdb/data/~2F?fb_gclid=Cj0KCQiAoJC-BhCSARIsAPhdfSiZhIhQq5EwsFPD_fkB-Ke1r7sGgwD08fdk_vxOPkKapXGoORROyxoaAoh2EALw_wcB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app };
