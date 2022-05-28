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

	// establish socket connection
	const socket = io('http://localhost:8000/chat', {
		extraHeaders: {
			authorization: `Bearer ${idToken}`,
		},
	});

	const getChatWith = email => {
		setChatWith(email);
	};

	return (
		<PageContent className={`${classes.PageContentClasses}`}>
			<Row className="h-100">
				<Col
					lg={4}
					md={6}
					className={`${classes.chatList} ${scollbarStyle.scollbar}`}
				>
					<ChatHistory chatWith={getChatWith} />
				</Col>
				<Col
					lg={8}
					md={6}
					className={`${classes.ChatContent} ${scollbarStyle.scollbar} ps-0 `}
				>
					<ChatContent
						socket={socket}
						getChatWithEmail={chatWith && chatWith}
					/>
				</Col>
			</Row>
		</PageContent>
	);
};

export default Chat;
