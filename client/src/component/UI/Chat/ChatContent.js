import React, { useEffect,useState } from 'react';
import moment from 'moment';

import { useSelector } from 'react-redux';

import classes from './ChatContent.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function ChatContent({socket , getChatWithEmail}) {

	const email = useSelector(store=>store.AuthData.email)

	const [Message , setMessage ] = useState([])
	const [MessageValue , setMessageValue ] = useState('')

	const [joined, setJoined] = useState(false);

	const  sendMessage = (messgae ,Email ) => {
			setJoined(true)
			socket.emit('new-message-to-server' ,{
				message : messgae ,
				receiverEmail : Email,
			})
			socket.emit('get-chat-history' ,{
				with : Email ,
			})
			setMessageValue('')
		}

		useEffect(()=>{

			if(getChatWithEmail){
				console.log("getChatWithEmail",  getChatWithEmail)
				socket.emit('get-chat-history' ,{
					with : getChatWithEmail ,
				})
				socket.on('chat-history-to-client' , (data =>{
					console.log("messages" , data)
					setMessage(data && [...data])
				}))
			}

		}, [joined , getChatWithEmail , socket])


		const getTime =(time) => {
			const Time = moment(time , 'LT').format('LT')
			console.log(Time)
			return Time
		}
		console.log(Message)
	return (
		<div className={`${classes.ChatContent}`}>
			{Message && Message.length !== 0 && <>
			<input type="text" placeholder='Type your message' className={`${classes.ChatContentInput}  form-control `} onChange={(e) => setMessageValue(e.target.value)} />
			<button className={`${classes.ChatContentButton} btn btn-secondary`} type="button" id="inputGroupFileAddon04"  >
				<FontAwesomeIcon icon={faPaperPlane} onClick={ () => sendMessage(MessageValue , getChatWithEmail)} />
			</button>
			</>}
			<div className={classes.Messages}>
				{Message && Message.length !== 0
					? Message.map(((message , index) => (
						<React.Fragment key={index}>
						<div className={message.senderEmail === email ? classes.messageFromMe : classes.messageFromOther} >
							<p className={classes.Email}> {message.senderEmail.substring(0,1).toUpperCase()} </p>
							<div className={classes.MessageContent}>
								<p> {message.message} </p>
							</div>
						</div>
						<p className={`${classes.MessageTime} ${message.senderEmail === email ? 'text-end' : 'text-start' }` }> { getTime(message.sentAt) }</p>
						</React.Fragment>
					)))

					:
					<p className='text-center text-danger pt-2'> No messages Now </p>
				}

			</div>
		</div>
	);
}

export default ChatContent;