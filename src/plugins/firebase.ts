import 'firebase/auth'
import 'firebase/firebase-firestore'
import firebase from 'firebase/app'

const apiKey = process.env.REACT_APP_FIREBASE_KEY

const config = {
  apiKey: apiKey,
  authDomain: 'myapp-11f4e.firebaseapp.com',
  databaseURL: 'https://myapp-11f4e.firebaseio.com',
  projectId: 'myapp-11f4e',
  storageBucket: 'myapp-11f4e.appspot.com',
  messagingSenderId: '760837434207',
  appId: '1:760837434207:web:0b48eb215e1578fd5624ea',
}

firebase.initializeApp(config)
const auth = firebase.auth()
export default auth
