import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBSoRJvmN80kEdGmJhaA2DSkEjznHZjBDU",
    authDomain: "slackclone-e9b3f.firebaseapp.com",
    projectId: "slackclone-e9b3f",
    storageBucket: "slackclone-e9b3f.appspot.com",
    messagingSenderId: "917437328084",
    appId: "1:917437328084:web:f2949b5ef1b2fc52f7a941",
    measurementId: "G-K3NY69803Z"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export {auth,provider} ;
