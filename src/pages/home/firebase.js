import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyClQNU6ZSYVS4RQP9lc0l_2awY8SFWv98A",
    authDomain: "loveserviceui.firebaseapp.com",
    databaseURL: "https://loveserviceui-default-rtdb.firebaseio.com",
    projectId: "loveserviceui",
    storageBucket: "loveserviceui.appspot.com",
    messagingSenderId: "545807751770",
    appId: "1:545807751770:web:3ed0b879ffe6bfb1b49663",
    measurementId: "G-SDM5Y6KTLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);