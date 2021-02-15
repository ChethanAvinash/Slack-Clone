import React,{useState} from 'react'
import '../Styles/ChatInput.css';
import db from "../Database/firebase";
import {useStateValue} from "../Providers/StateProvider";
import firebase from "firebase";



function ChatInput({channelName,channelId}) {

    const [input,setInput] = useState('');
    const [{user}] = useStateValue();

    const sendMessage = (e) => {
        e.preventDefault();

        if (channelId){
            db.collection('rooms').doc(channelId).collection("Messages").add({
                message: input,
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL,
            });
            setInput('');
        }
    }

    return (
        <div className='chatInput'>
            <form>
                <input 
                placeholder={`Send a message to #${channelName}`}
                value={input}
                onChange={ e => setInput(e.target.value)}
                />
                <button type="submit" onClick={sendMessage}>SEND</button>
            </form>
        </div>
    )
}

export default ChatInput;
