import React from 'react';

import PageContent from '../DashboardLayout/Pagecontant/pageContent';
import BuyerDashboardContent from '../../Modules/BuyerModule/BuyerDashboard';
import classes from './Chat.module.css'
import { Col, Row } from 'react-bootstrap';


import ChatHistory from './ChatHistory';
import scollbarStyle from '../../UI/ScrollBar.module.css'
import ChatContent from './ChatContent';

const  Chat = () => {
    return (
      <BuyerDashboardContent>
				<PageContent className={`${classes.PageContentClasses}`}>
					<Row className="h-100">
						<Col lg={4} md={6} className={`${classes.chatList} ${scollbarStyle.scollbar}`} >
							<ChatHistory/>
						</Col>
						<Col lg={8} md={6} className={`${classes.ChatContent} ${scollbarStyle.scollbar} ps-0 `}>
							<ChatContent/>
						</Col>
					</Row>
				</PageContent>
			</BuyerDashboardContent>
     );
}

export default Chat;