import React, {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatContentUi from './ChatContentUi';

function ChatContent({ socket,getChatWithEmail ,className }) {

	const role = useSelector(store => store.AuthData.role);
	const email = useSelector(store => store.AuthData.email);


	const [Message, setMessage] = useState([]);

	const sendMessage = (message, Email) => {
	if (message) {
		if (role !== 'employee') {
			// send new Message to support
			if(Email === 'Support@email.com'){
				socket.emit('new-message-to-Support', {
					message: message,
				});
				// socket.on('new-message-to-Employee', data => {
				// 	setMessage(prevState => prevState && prevState.length > 0 ? [...prevState, message] : [data]);
				// });
			}
			else {socket.emit('new-message-to-server', {
				message: message,
				receiverEmail: Email,
			});}
		}

		// to send message from support to client
		else{
			console.log("send message to client" , message , Email)
			socket.emit('new-message-From-Support', {
				message: message,
				receiverEmail: Email,
			});
		}
		}
	};

	// start get chat history when reload
	useEffect(() => {
		socket.on('chat-history-to-client', data => {
			setMessage(data && [...data]);
		});

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
		// if(role!== 'employee'){

			socket.on('new-message-to-client', data => {
				setMessage(prevState => prevState && prevState.length > 0 ? [...prevState, data] : [data]);
			});
				// get all chat history
				socket.on('chat-history-to-client', data => {
					setMessage(data && [...data]);
				});
				// socket.on('new-message-From-Employee', data => {
				// 	setMessage(prevState => prevState && prevState.length > 0 ? [...prevState, data] : [data]);
				// });



		// }
		// end get all chats to [seller or buyer]

		// ///////////////////////////////////////////////////

		// start get all chats to employee
		// if(role) {


		// }
		// end get all chats to employee

	}, [socket]);

	useEffect(()=>{
		if(role === 'buyer' || role === 'seller'){
			socket.on('new-message-to-Employee', data => {
				console.log("new-message-to-Employee" , data)
					setMessage(prevState => prevState && prevState.length > 0 ? [...prevState, data] : [data]);
			});
			socket.on('new-message-From-Employee', data => {
				console.log("new-message-From-Employee" , data)
					setMessage(prevState => prevState && prevState.length > 0 ? [...prevState, data] : [data]);
			});
		}

		if(role === 'employee'){

			socket.on('new-message-From-Employee', data => {
				console.log("new-message-From-Employee" , data)
					setMessage(prevState => prevState && prevState.length > 0 ? [...prevState, data] : [data]);
			});
			socket.on('new-message-to-Employee', data => {
				console.log("new-message-to-Employee" , data)

					setMessage(prevState => prevState && prevState.length > 0 ?
						(data.message !== prevState[prevState.length -1].message  ? [...prevState, data] : [...prevState]) : [data]);
			});


		}
	},[socket , role])



	return (
		<ChatContentUi Message={Message && Message} sendMessage={sendMessage} className={className} getChatWithEmail={getChatWithEmail}/>
	);
}

export default ChatContent;
