import firebase from "firebase";
// import { v4 as uuidv4 } from 'uuid';
// import 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
};

try {
  firebase.initializeApp(firebaseConfig)
} catch (error) {
  console.log(error)
}
const db = firebase.firestore()
export {firebase}
export default db