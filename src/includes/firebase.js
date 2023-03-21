import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBF0tU6trjMxgtW4jjRyoRoOZw8S8iB_A8',
  authDomain: 'music-app-8e851.firebaseapp.com',
  projectId: 'music-app-8e851',
  storageBucket: 'music-app-8e851.appspot.com',
  // messagingSenderId: "36541612554",
  appId: '1:36541612554:web:9231d4638d5845382855f3'
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()
export const usersCollection = db.collection('users')
export const songsCollection = db.collection('songs')
export const storage = firebase.storage()
