import firebase from 'firebase'

 // firebaseで設定したconfig情報を追加し、Firebaseのインスタンスを作成
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC_730ZmO8rOnJv02KEBnaydc5d9KlnwLA",
    authDomain: "firechat-eb0f5.firebaseapp.com",
    projectId: "firechat-eb0f5",
    storageBucket: "firechat-eb0f5.appspot.com",
    messagingSenderId: "855670603066",
    appId: "1:855670603066:web:a9bcf2477bcbd1045da403",
    measurementId: "G-GEJDXM80CV"
})

// firebaseのDB操作用の機能
const db = firebaseApp.firestore()

// firebaseのAuhenticate用の機能
const auth = firebase.auth()

export { db, auth }