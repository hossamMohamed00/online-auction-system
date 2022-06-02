import React, {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatContentUi from './ChatContentUi';

<<<<<<< HEAD
function ChatContent({ socket,getChatWithEmail ,className }) {

	const role = useSelector(store => store.AuthData.role);

	const [Message, setMessage] = useState([]);

	const sendMessage = (message, Email) => {
	if (message) {
		if (role!== 'employee') {
=======
// import classes from './ChatContent.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ChatContentUi from './ChatContentUi';

function ChatContent({ socket,getChatWithEmail ,className }) {

	const role = useSelector(store => store.AuthData.role);

	const [Message, setMessage] = useState([]);

	const [joined, setJoined] = useState(false);

	// console.log(getChatWithEmail)
	console.log(getChatWithEmail)

	const sendMessage = (message, Email) => {
	if (message) {
		if (role!== 'employee') {
			setJoined(true);
>>>>>>> main
			socket.emit('new-message-to-server', {
				message: message,
				receiverEmail: Email,
			});
		}
		// send new Message to support
		else if(Email === 'Support@email.com'){
<<<<<<< HEAD
=======
			setJoined(true);
>>>>>>> main
			socket.emit('new-message-to-Support', {
				message: message,
			});
		}
		// to send message from support to client
		else{
			console.log("send message to client" , message , Email)
<<<<<<< HEAD
=======
			setJoined(true);
>>>>>>> main
			socket.emit('new-message-From-Support', {
				message: message,
				receiverEmail: Email,
			});
		}
		}
	};

	// start get chat history when reload
	useEffect(() => {
		if (getChatWithEmail && role!== 'employee') {
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

<<<<<<< HEAD
		// ///////////////////////////////////////////////////

=======
>>>>>>> main
		// start get all chats to employee
		else{

			// get all chat history
			socket.on('chat-history-to-client', data => {
				setMessage(data && [...data]);
<<<<<<< HEAD
			});
			socket.on('new-message-From-Employee', data => {
=======
				console.log(data)
			});
			socket.on('new-message-From-Employee', data => {
				console.log(data)
>>>>>>> main
				setMessage(prevState => prevState && prevState.length > 0 ? [...prevState, data] : [data]);
			});

			socket.on('new-message-to-Support', data => {
<<<<<<< HEAD
=======
				console.log(data)
>>>>>>> main
				setMessage(prevState => prevState && prevState.length > 0 ? [...prevState, data] : [data]);
			});

		}
		// end get all chats to employee

	}, [socket]);




	return (
		<ChatContentUi Message={Message && Message} sendMessage={sendMessage} className={className} getChatWithEmail={getChatWithEmail}/>
	);
}

export default ChatContent;
