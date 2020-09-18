import app from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCTLgkfk4P9SRC6Vnvxw6cbgBsp8qmKdGw",
    authDomain: "insta-up-b7af5.firebaseapp.com",
    databaseURL: "https://insta-up-b7af5.firebaseio.com",
    projectId: "insta-up-b7af5",
    storageBucket: "insta-up-b7af5.appspot.com",
    messagingSenderId: "370739050143",
    appId: "1:370739050143:web:fbd7cc3d9a9c469eef14aa",
    measurementId: "G-2VYJ9HG5BE"
};

app.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };