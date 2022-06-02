import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import { useSelector } from 'react-redux';

// import classes from './ChatContent.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ChatContentUi from './ChatContentUi';

function ChatContent({ socket,getChatWithEmail ,className }) {

	const role = useSelector(store => store.AuthData.role);
	// const email = useSelector(store => store.AuthData.email);

	const [Message, setMessage] = useState([]);

	const [joined, setJoined] = useState(false);

	// console.log(getChatWithEmail)
	console.log(getChatWithEmail)

	const sendMessage = (message, Email) => {
	if (message) {
		if (role!== 'employee') {
			setJoined(true);
			socket.emit('new-message-to-server', {
				message: message,
				receiverEmail: Email,
			});
		}
		// to send message from support to client
		else{
			console.log("send message to client" , message , Email)
			setJoined(true);
			socket.emit('new-message-From-Support', {
				message: message,
				receiverEmail: Email,
			});
			socket.on('new-message-From-Employee', data => {
				console.log(data)
				setMessage(prevState => prevState && prevState.length > 0 ? [...prevState, data] : [data]);
			});
		}
		}
	};

	// start get chat history when reload
	useEffect(() => {
		if (getChatWithEmail && role!== 'employee') {
			console.log('Load chat history... ');

			socket.emit('get-chat-history', {
				with: getChatWithEmail,
			});
		}
		// get chat history with this email
		if (role === 'employee') {
			console.log('Load chat history... ' , getChatWithEmail);
			socket.emit('get-chat-history', {
				with: getChatWithEmail	,
			});

		}
	}, [getChatWithEmail]);
	// end get chat history when reload


	useEffect(() => {
		// start get all chats to [seller or buyer]
		if(role!== 'employee'){
			socket.on('chat-history-to-client', data => {
				setMessage(data && [...data]);
			});

			socket.on('new-message-to-client', data => {
				setMessage(prevState => prevState && prevState.length > 0 ? [...prevState, data] : [data]);
			});
		}
		// end get all chats to [seller or buyer]

		// start get all chats to employee
		else{
			console.log("get-chat-history")

			// get all chat history
			socket.on('chat-history-to-client', data => {
				setMessage(data && [...data]);
				console.log(data)
			});

			socket.on('new-message-From-Support', data => {
				console.log(data)
				setMessage(prevState => prevState && prevState.length > 0 ? [...prevState, data] : [data]);
			});

			socket.on('new-message-to-Support', data => {
				console.log(data)
				setMessage(prevState => prevState && prevState.length > 0 ? [...prevState, data] : [data]);
			});


		}
		// end get all chats to employee

	}, [socket]);




	return (
		role !== 'employee' ?
		<ChatContentUi Message={Message && Message} sendMessage={sendMessage} className={className} getChatWithEmail={getChatWithEmail}/>
		: <ChatContentUi Message={Message && Message} sendMessage={sendMessage} className={className} getChatWithEmail={getChatWithEmail}/>

	);
}

export default ChatContent;
