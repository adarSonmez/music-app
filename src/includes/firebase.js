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

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

db.enablePersistence().catch((err) => {
  if (err.code === 'failed-precondition') {
    console.log('Multiple tabs open, persistence can only be enabled in one tab at a a time.')
  } else if (err.code === 'unimplemented') {
    console.log(
      'The current browser does not support all of the features required to enable persistence'
    )
  } else {
    console.log(err)
  }
})

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export { auth, db, usersCollection, songsCollection, commentsCollection, storage }
