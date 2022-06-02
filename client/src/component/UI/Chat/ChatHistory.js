import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { getChats } from '../../../Api/Chat';
import useHttp from '../../../CustomHooks/useHttp';

import classes from './ChatHistory.module.css';
import { useLocation } from 'react-router-dom';

const ChatHistory = ({ chatWith , className , onShow}) => {
	const [activeChat, setActiveChat] = useState('');

	const [chats, setChats] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const { sendRequest, status, data } = useHttp(getChats);
	const idToken = useSelector(store => store.AuthData.idToken);
	const ChatEmail = useSelector(store => store.AuthData.email);

	const location = useLocation()
	const chatWithEmail = new URLSearchParams(location.search).get('email')

	useEffect(() => {
		sendRequest(idToken);
	}, [sendRequest , chatWithEmail]);

	useEffect(() => {
		if (status === 'completed') {
			console.log(data);
			data.map(chat => {
				if (chat.messages.length !== 0) {
					console.log(chat.user1, chat.user2, email, chat.user1 === ChatEmail);
					let email = chat.user1 === ChatEmail ? chat.user2 : chat.user1;
					let lastMessage = chat.messages[chat.messages.length - 1].message;
					let lastMessageTime = chat.messages[chat.messages.length - 1].sentAt;
					setChats(prevChats => [
						...prevChats,
						{
							email: email,
							lastMessage: lastMessage,
							lastMessageTime: moment(lastMessageTime).format('LT'),
						},
					]);
				}
			});
		}
	}, [status]);

	const getChat = (email) => {
		setActiveChat(email);
		chatWith(email);
		onShow(false)
	};

	const FilterChats = searchTerm => {
		return chats.filter(
			chat =>
				chat.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
				!searchTerm,
		);
	};

	const noChatHistoryContent = chatWithEmail && <div
		className={`${classes.ChatHistoryContent} ${ classes.activeChat } `}
		// onClick={() => getChat(chatWithEmail)}
	>
	<div className={classes.UserImage}>
		<span className="rounded-circle bg-light px-2 pb-1">
			{chatWithEmail.substring(0, 1)}
		</span>
	</div>
	<div className="w-100 ">
		<h6 className={classes.UserName}>
			{chatWithEmail.substring(0, chatWithEmail.indexOf('@'))}
		</h6>
	</div>
	</div>

	const checkIfNoChat = chats.filter(chat => chat.email === chatWithEmail)

	useEffect(()=>{
		if(chatWithEmail && checkIfNoChat.length === 0 ){
			getChat(chatWithEmail)
			setActiveChat(chatWithEmail)
		}
	},[getChat])

	const ChatHistoryContent =
		FilterChats(searchTerm).map((chat,index) => {
			return (
				<>
			{(chatWithEmail || !chatWithEmail) &&
				(
				<div
					className={` ${classes.ChatHistoryContent} ${
						((activeChat === chat.email)) ? classes.activeChat : ''
					} `}
					key={index}
					onClick={() => getChat(chat.email)}
				>
					<div className={classes.UserImage}>
						<span className="rounded-circle bg-light px-2 pb-1">
							{chat.email.substring(0, 1)}
						</span>
					</div>
					<div className="w-100 ">
						<h6 className={classes.UserName}>
							{chat.email.substring(0, chat.email.indexOf('@'))}
						</h6>
						<span className={classes.MessageTime}>
							{chat.lastMessageTime}
						</span>
						<p className={classes.MessageContent}> {chat.lastMessage} </p>
					</div>
				</div>
				)
			}
			{/* if no chat history to this user  */}
			{ checkIfNoChat.length === 0 && noChatHistoryContent}

			</>
			)
		})




	return (
		<>
			<div className={`${classes.ChatHistory} ${className ? className : '' } `}>
				<input
					type="text"
					placeholder="search"
					className={`${classes.ChatHistorySearch}  form-control `}
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>

				{ChatHistoryContent}

			</div>
		</>
	);
};

export default ChatHistory;
