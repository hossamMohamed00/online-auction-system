import React, { useState } from 'react';

import classes from './ChatHistory.module.css'

const ChatHistory = ({chatWith}) => {

	const [activeChat , setActiveChat] = useState(false)
	let ChatHistoryContentClasses = `${classes.ChatHistoryContent} ${activeChat ?  classes.activeChat : ''}`

	const getChat = () => {
		setActiveChat(true)
		chatWith('buyer3@email.com')
	}
	return (
		<>
			<div className={`${classes.ChatHistory} `}>
				<input type="text" placeholder='search' className={`${classes.ChatHistorySearch}  form-control `}/>

				<div className={ChatHistoryContentClasses} onClick={getChat}>
					<div className={classes.UserImage}>
						<span className='rounded-circle bg-light px-2 py-1'> {"Buyer".substring(0,1) } </span>
					</div>
					<div className='w-100 '>
						<h6 className={classes.UserName}> Buyer 2 </h6>
						<span className={classes.MessageTime}> 4:44 am </span>
						<p className={classes.MessageContent}>  Messgae from Buyer 4</p>
					</div>

				</div>

			</div>

		</>
	);
}

export default ChatHistory;