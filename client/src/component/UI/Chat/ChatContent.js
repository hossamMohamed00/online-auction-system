import React, { useEffect, useRef, useState } from 'react';

import io from 'socket.io-client'
import { useSelector } from 'react-redux';

import classes from './ChatContent.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function ChatContent() {

	const idToken = useSelector(store=>store.AuthData.idToken)
	const email = useSelector(store=>store.AuthData.email)

	const [Message , setMessage ] = useState([])
	const MessageRef = useRef()

		// establish socket connection
		const socket = io("http://localhost:8000/chat", {
			extraHeaders: {
				'authorization': `Bearer ${idToken}`,
			},
		});

		const  sendMessage = (messgae) => {
			socket.emit('new-message-to-server' ,{
				message : messgae ,
				receiverEmail : "buyer3@email.com",
			})
		}

		useEffect(()=>{
			socket.emit('get-chat-history' ,{
				with : "buyer3@email.com" ,
			})
		})

		useEffect(()=>{
			socket.on('chat-history-to-client' , (data =>{
				console.log("messages" , data)
				setMessage(prevState => [...prevState , data])
			}))
		},[])

		const getTime =(time) => {
			const date  = new Date(time)
			console.log(date)
			// return date.getHours() + ` : ` + date.getMinutes()
			return "12 : 20 pm"
		}
	return (
		<div className={`${classes.ChatContent}`}>
			<input type="text" placeholder='search' className={`${classes.ChatContentInput}  form-control `} ref={MessageRef} />
			<button class={`${classes.ChatContentButton} btn btn-outline-secondary`} type="button" id="inputGroupFileAddon04" onClick={() => sendMessage(MessageRef.current.value)}>
				<FontAwesomeIcon icon={faPaperPlane} />
			</button>

			<div className={classes.Messages}>
				{Message[0] && Message[0].length !== 0
					? Message[0].map((message => (
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