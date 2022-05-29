import React, { useState } from 'react';

import io from 'socket.io-client';

import PageContent from '../DashboardLayout/Pagecontant/pageContent';
import classes from './Chat.module.css';
import { Col, Row } from 'react-bootstrap';

import ChatHistory from './ChatHistory';
import scollbarStyle from '../../UI/ScrollBar.module.css';
import ChatContent from './ChatContent';
import { useSelector } from 'react-redux';
import SellerDashboardContent from '../../Modules/SellerModule/SellerModule';

const Chat = () => {
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
					className={`${classes.chatList} ${scollbarStyle.scollbar}`}
				>
					<ChatHistory
						chatWith={getChatWith}
						className={` ${showChatHistory ? 'd-block' : 'd-none d-md-block' } `}
						onShow = {ShowChatHistoryHandler}
					/>
				</Col>
				<Col
					lg={8}
					md={6}
					sm={12}
					className={`${classes.ChatContent} ${scollbarStyle.scollbar} `}
				>
					<button
						className={`btn bg-danger text-light ${!showChatHistory ? 'd-block d-xs-block' : 'd-none' }	`}
						onClick={() => setShowChatHistory(true)}> X
					</button>
					<ChatContent
						socket={socket}
						getChatWithEmail={chatWith && chatWith}
						className={` ${chatWith && !showChatHistory ? 'd-block d-xs-block' : 'd-none d-md-block' } ps-0 `}
					/>

				</Col>
			</Row>
		</PageContent>
	);
};

export default Chat;
