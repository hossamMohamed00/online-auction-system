import React , {useEffect, useRef, useState} from 'react';

import { w3cwebsocket as W3CWebSocket } from "websocket";

function Chat() {
    const client = new W3CWebSocket('ws://127.0.0.1:8000/chat');
    // const messageRef = useRef()
    // const userRef = useRef()

    // const [messages , setMessages ] = useState([])


    // const sendMessage = (msgBody) => {
    //     client.new-message-to-server(JSON.stringify(
		// 			{ message: msgBody.msg , receiverEmail: msgBody.receiverEmail }
    //     ));
    // }

    useEffect(()=>{
        client.onopen = () => {
          console.log('websocket')
        }
    },[client.onopen])


    return (
        <p> hello </p>
     );
}

export default Chat;