import React from "react";

import {useDispatch } from 'react-redux'
import {RegisterActions} from '../../../../store/slices/RegisterSlices/Register'

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
		if(props.nxt==='Step4'){
			props.onClick && props.onClick()
		}

	}

	return (
		<div className = {classes['btn-steps']}>
			<button onClick = {previousHandeler} className='btn text-light' type="button">	Previous</button>
			{props.nxt && <button onClick = {nextHandeler} className='btn-primary btn  mx-2' type="button"> Next</button> }
		</div>
	);
}

export default Buttons;