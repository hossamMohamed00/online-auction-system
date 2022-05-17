import React , {useEffect, useState} from 'react';

// import io from 'socket.io-client'

import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import BuyerDashboardContent from '../BuyerDashboard';
import classes from './Chat.module.css'

const  Chat = () => {

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
					<div className={classes.chatList}>
						<h1 className='pt-5'> chat </h1>
					</div>
				</PageContent>
			</BuyerDashboardContent>
     );
}

export default Chat;