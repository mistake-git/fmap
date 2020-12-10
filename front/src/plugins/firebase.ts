import 'firebase/auth'
import 'firebase/firebase-firestore'

import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAuZdIfDMKYifo4fMjnYHP0gf3PWWHrYfg',
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
