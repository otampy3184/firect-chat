import React from 'react'
import firebase from 'firebase'
import { auth } from '../firebase.js'
import { Button } from '@material-ui/core'

// FirebaseのAuthenticate機能を用いたサインイン用機能
function SignIn() {
    function signInWithGoogle() {
        // FirebaseのインスタンスからAuthProviderを作成する
        const provider = new firebase.auth.GoogleAuthProvider()
        // Providerを使ってサインイン処理を行う
        auth.signInWithPopup(provider)
    }
    // うまい感じに描画しつつ、上のSignInWithGoogleを実行する
    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
            <Button style={{ padding: '30px', fontSize: '20px', borderRadius: '0', fontWeight: '600' }} onClick={signInWithGoogle}>Sign In With Google</Button>
        </div>
    )
}

export default SignIn