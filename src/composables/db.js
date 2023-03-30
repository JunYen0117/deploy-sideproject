import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export const dataBase = () => {
  const firebaseConfig = {
    // FIREBASE_CONFIGURATION
    apiKey: 'AIzaSyCGHesU7GxLAnOIpobOE2Ou2h5dlaKW4xI',
    authDomain: 'my-project-3ce80.firebaseapp.com',
    projectId: 'my-project-3ce80',
    storageBucket: 'my-project-3ce80.appspot.com',
    messagingSenderId: '569893165363',
    appId: '1:569893165363:web:d9368f4caa1901d074c646'
  }
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app)
  const storage = getStorage(app)

  return { db, storage }
}
