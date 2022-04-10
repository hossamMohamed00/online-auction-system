import React from "react";

import {useDispatch } from 'react-redux'
import {RegisterActions} from '../../../../store/slices/Register'

import classes from './Buttons.module.css'

const Buttons = (props) => {

	const dispatch = useDispatch()

	const previousHandeler = () =>{
		if(props.prev==='Step1'){
			dispatch(RegisterActions.showStep1())
		}
		if(props.prev==='Step2'){
			dispatch(RegisterActions.showStep2())
		}
	}

	const nextHandeler = () =>{
		if(props.nxt==='Step2'){
			dispatch(RegisterActions.showStep2())
		}
		if(props.nxt==='Step3'){
			props.onClick && props.onClick()
			dispatch(RegisterActions.showStep3())
		}

	}

	return (
		<div className = {classes['btn-steps']}>
			<button onClick = {previousHandeler} className="btn btn-primary " type="button">	Previous</button>
			{props.nxt && <button onClick = {nextHandeler} className="btn btn-primary mx-2" type="button"> Next</button> }
		</div>
	);
}

export default Buttons;