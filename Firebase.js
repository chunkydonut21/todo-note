import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCVS2qqrYMqoiFF3ugx-ru0VAVn5aa2DN0',
  authDomain: 'todoapp-bff42.firebaseapp.com',
  projectId: 'todoapp-bff42',
  storageBucket: 'todoapp-bff42.appspot.com',
  messagingSenderId: '602802903834',
  appId: '1:602802903834:web:e2a62432f3438a31f0eaa3',
  measurementId: 'G-TP6MVB998H'
}

// Initialize Firebase
let app
let auth
let firestore

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig)
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  })
  firestore = getFirestore(app)
} else {
  app = getApp()
  auth = getAuth()
  firestore = getFirestore()
}

export { app, auth, firestore }
