import logo from './logo.svg';
import './App.css';

// import firebase sdk
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import firebase hooks
import { useAuthState } from 'react-firebase-hooks';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// 作成したfirebaseのアプリのコンフィグを入れる
firebase.initializeApp({
  apiKey: "AIzaSyA6xkRYS5rXsIr91SBSCslU53yqY5OWbmw",
  authDomain: "firect-chat.firebaseapp.com",
  projectId: "firect-chat",
  storageBucket: "firect-chat.appspot.com",
  messagingSenderId: "947863578423",
  appId: "1:947863578423:web:8a97bac80ef2d557ad1cb2",
  measurementId: "G-9D2J78MDM1"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn /> }
      </section>
    </div>
  );
}


// google認証を使ったサインイン機能
function Signin() {
  const singInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={singInWithGoogle}>Google認証</button>
  )
}


export default App;
