import React, { useState } from 'react';

import io from 'socket.io-client';

import PageContent from '../DashboardLayout/Pagecontant/pageContent';
import classes from './Chat.module.css';
import { Col, Row } from 'react-bootstrap';

import ChatHistory from './ChatHistory';
import scrollbarStyle from '../../UI/ScrollBar.module.css';
import ChatContent from './ChatContent';
import { useSelector } from 'react-redux';
import SellerDashboardContent from '../../Modules/SellerModule/SellerModule';

const Chat = (props) => {
	const idToken = useSelector(store => store.AuthData.idToken);
	const [chatWith, setChatWith] = useState('');
	const [showChatHistory, setShowChatHistory] = useState(true);



	// establish socket connection
	const socket = io('http://localhost:8000/chat', {
		extraHeaders: {
			authorization: `Bearer ${idToken}`,
		},
	});

	const getChatWith = email => {
		setChatWith(email);
	};
	const ShowChatHistoryHandler = value => {
		setShowChatHistory(value);
	};

	return (
		<PageContent className={`${classes.PageContentClasses}`}>
			<Row className="h-100 m-0">
				<Col
					lg={4}
					md={6}
					sm={12}
					className={`${classes.chatList} ${scrollbarStyle.scrollbar}`}
				>
					<ChatHistory
						chatWith={getChatWith}
						className={` ${showChatHistory ? 'd-block' : 'd-none d-md-block' } `}
						onShow = {ShowChatHistoryHandler}
						getChatHistoryWith ={props.email && props.email}
					/>
				</Col>
				<Col
					lg={8}
					md={6}
					sm={12}
					className={`${classes.ChatContent} ${scrollbarStyle.scrollbar} p-0 `}
				>
					<button
						className={`btn bg-danger text-light position-fixed ${!showChatHistory ? 'd-block d-xs-block d-sm-block d-md-none' : 'd-none' }	`}
						onClick={() => setShowChatHistory(true)}> X
					</button>
					<ChatContent
						socket={socket}
						getChatWithEmail={chatWith && chatWith}
						className={` ${chatWith && !showChatHistory ? 'd-block d-xs-block' : 'd-none d-md-block' } `}
					/>

				</Col>
			</Row>
		</PageContent>
	);
};

export default Chat;
