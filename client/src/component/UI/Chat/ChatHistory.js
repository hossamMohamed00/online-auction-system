import React from 'react';

import classes from './ChatHistory.module.css'

const ChatHistory = () => {
	return (
		<>
			<div className={`${classes.ChatHistory}  `}>
				{/* <h3 className='pt-3'> Chat History</h3> */}
				<input type="text" placeholder='search' className={`${classes.ChatHistorySearch}  form-control `}/>

				{/* <hr className= {`${classes.ChatHistoryFooter}`}></hr> */}


				<div className={classes.ChatHistoryContent}>
					<div className={classes.UserImage}>
						<span className='rounded-circle bg-light px-2 py-1'> {"Buyer".substring(0,1) } </span>
					</div>
					<h6 className={classes.UserName}>
						Buyer 2
					</h6>

				</div>


				<div className={classes.ChatHistoryContent}>
					<div className={classes.UserImage}>
						<span className='rounded-circle bg-light px-2 py-1'> {"Buyer".substring(0,1) } </span>
					</div>
					<h6 className={classes.UserName}>
						Buyer 2
					</h6>

				</div>

				<div className={classes.ChatHistoryContent}>
					<div className={classes.UserImage}>
						<span className='rounded-circle bg-light px-2 py-1'> {"Buyer".substring(0,1) } </span>
					</div>
					<h6 className={classes.UserName}>
						Buyer 2
					</h6>

				</div>

				<div className={classes.ChatHistoryContent}>
					<div className={classes.UserImage}>
						<span className='rounded-circle bg-light px-2 py-1'> {"Buyer".substring(0,1) } </span>
					</div>
					<h6 className={classes.UserName}>
						Buyer 2
					</h6>

				</div>

				<div className={classes.ChatHistoryContent}>
					<div className={classes.UserImage}>
						<span className='rounded-circle bg-light px-2 py-1'> {"Buyer".substring(0,1) } </span>
					</div>
					<h6 className={classes.UserName}>
						Buyer 2
					</h6>

				</div>
			</div>

		</>
	);
}

export default ChatHistory;