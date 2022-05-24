import React, { useState } from 'react'
import { db, auth } from '../firebase'
import firebase from 'firebase'
import { Input, Button } from '@material-ui/core'

// チャット内でメッセージの送信を行い、送信したメッセージをFirebaseのStoreに保存する機能
function SendMessage({ scroll }) {
    // msg用のステート変数、ステート変数を更新するための関数を設定する
    const [msg, setMsg] = useState('')

    // sendMsgを実行し、FirebaseのStoreに情報を保存する
    async function sendMessage(e) {
        e.preventDefault()
        const { uid, photoURL } = auth.currentUser

        // FirebaseのDB内部に取得したMsgを保存する
        await db.collection('messages').add({
            text: msg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        // setMsgを実行、Msg送信用の描画を返す
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</Button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage