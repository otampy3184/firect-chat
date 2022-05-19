import logo from './logo.svg';
import './App.css';

// import firebase sdk
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';  

// import firebase hooks
import { useAuthState } from 'react-firebase-hooks';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { signOut } from 'firebase/auth';

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

// サインアウト機能
function signOut() {
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

// chatroomを描画する機能
function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}

export default App;
