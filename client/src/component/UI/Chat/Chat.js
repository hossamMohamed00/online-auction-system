import React , {useEffect, useState} from 'react';

import PageContent from '../DashboardLayout/Pagecontant/pageContent';
import BuyerDashboardContent from '../../Modules/BuyerModule/BuyerDashboard';
import classes from './Chat.module.css'
import { Col, Row } from 'react-bootstrap';

// import io from 'socket.io-client'

const  Chat = () => {
	console.log("chat")
    // const client = io.connect('127.0.0.1:8000/chat');
		// const [socket, setSocket] = useState(null);

		// establish socket connection
		// useEffect(() => {
		// 	setSocket(io('http://localhost:8000/chat') );
		// }, []);

		// console.log(socket)
    return (
      <BuyerDashboardContent>
				<PageContent className={`${classes.PageContentClasses}`}>
					<Row className="h-100">
						<Col lg={4} md={6} className={classes.chatList}>
							<h1 className='pt-5'> chat </h1>
						</Col>
						<Col lg={8} md={6} className=''>
							<h1 className='pt-5'> chat Content </h1>
						</Col>
					</Row>
				</PageContent>
			</BuyerDashboardContent>
     );
}

export default Chat;