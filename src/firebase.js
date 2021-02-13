import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
var firebaseConfig = {
    apiKey: "AIzaSyDK1bCSaYA9nRwz8XJ2ROaqa6UefmPZe6w",
    authDomain: "notes-drive-app.firebaseapp.com",
    projectId: "notes-drive-app",
    storageBucket: "notes-drive-app.appspot.com",
    messagingSenderId: "1024113780558",
    appId: "1:1024113780558:web:609939cb4d09877823601f"
  };
  // Initialize Firebase
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const storage=firebaseApp.storage();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {db,storage,auth,provider};