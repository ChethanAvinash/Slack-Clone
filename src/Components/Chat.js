import React,{useState,useEffect}from 'react';
import '../Styles/Chat.css';
import {useParams} from "react-router-dom";
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import db from '../Database/firebase';
import Message from './Message';
import ChatInput from './ChatInput';

function Chat() {
    const {roomID,roomName} = useParams();
    const [roomMessages,setRoomMessages] = useState([]);

    useEffect(() => {
        if(roomID){
            db.collection('rooms').doc(roomID).collection('Messages').orderBy('timestamp','asc')
            .onSnapshot( snapshot => (
                setRoomMessages(
                    snapshot.docs.map(doc => doc.data())
                )
            ))
        }

    }, [roomID]);

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__header__left">
                    <h4 className="chat__header__channelName">
                        <strong># {roomName}</strong>
                        <StarOutlineIcon/>
                    </h4>
                </div>
                <div className="chat__header__right">
                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>
                </div>
            </div>

            <div className="chat__messages">
                {
                    roomMessages.map(({message,timestamp,user,userImage}) => (
                        <Message
                            key = {timestamp}
                            message = {message}
                            timestamp = {timestamp}
                            user = {user}
                            userImage = {userImage}
                        />
                    ))
                }
            </div>

            <ChatInput channelName={roomName} channelId={roomID}/>
        </div>
    )
}

export default Chat;
