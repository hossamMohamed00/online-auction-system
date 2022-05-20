import React, { useCallback, useEffect, useRef, useState } from 'react';

import io from 'socket.io-client'
import { useSelector } from 'react-redux';

import classes from './ChatContent.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function ChatContent() {

	const idToken = useSelector(store=>store.AuthData.idToken)
	const email = useSelector(store=>store.AuthData.email)

	const [Message , setMessage ] = useState([])
	const [MessageValue , setMessageValue ] = useState('')

	const [joined, setJoined] = useState(false);

	// establish socket connection
		const socket = io("http://localhost:8000/chat", {
			extraHeaders: {
				'authorization': `Bearer ${idToken}`,
			},
		});

		const  sendMessage = useCallback((messgae) => {
			setJoined(true)
			socket.emit('new-message-to-server' ,{
				message : messgae ,
				receiverEmail : "buyer3@email.com",
			})
			socket.emit('get-chat-history' ,{
				with : "buyer3@email.com" ,
			})
			setMessageValue('')
		},[])

		useEffect(()=>{
			socket.emit('get-chat-history' ,{
				with : "buyer3@email.com" ,
			})
			socket.on('chat-history-to-client' , (data =>{
				console.log("messages" , data)
				setMessage(data && [...data])
			}))
		}, [joined])

		// console.log(Message)

		const getTime =(time) => {
			const date  = new Date(time)
			// console.log(date)
			// return date.getHours() + ` : ` + date.getMinutes()
			return "12 : 20 pm"
		}
	return (
		<div className={`${classes.ChatContent}`}>
			<input type="text" placeholder='search' className={`${classes.ChatContentInput}  form-control `} onChange={(e) => setMessageValue(e.target.value)} />
			<button class={`${classes.ChatContentButton} btn btn-outline-secondary`} type="button" id="inputGroupFileAddon04" onClick={() => sendMessage(MessageValue)}>
				<FontAwesomeIcon icon={faPaperPlane} />
			</button>

			<div className={classes.Messages}>
				{Message && Message.length !== 0
					? Message.map((message => (
						<>
						<div className={message.senderEmail === email ? classes.messageFromMe : classes.messageFromOther}>
							<p className={classes.Email}> {message.senderEmail.substring(0,1).toUpperCase()} </p>
							<div className={classes.MessageContent}>
								<p> {message.message} </p>
							</div>
						</div>
						<p className={`${classes.MessageTime} ${message.senderEmail === email ? 'text-end' : 'text-start' }` }> { getTime(message.sendAt) }</p>
						</>
					)))

					:
					<p className='text-center text-danger pt-2'> No messages Now </p>
				}

			</div>
		</div>
	);
}

export default ChatContent;