import React  from "react"
import classes from './Steps.module.css'

import {useDispatch , useSelector} from 'react-redux'
import {RegisterActions} from '../../../store/slices/Register'

const Step2 = () => {

	const dispatch = useDispatch()

	const step1Name = useSelector(store => store.RegisterAuth.step1Details.name)

	console.log(step1Name)
	const previousHandeler = () =>{
			dispatch(RegisterActions.showStep1())
	}

	const nextHandeler = () =>{
		dispatch(RegisterActions.showStep3())
	}



	return(
		<div className="container">
			<h3> Account Setup</h3>
			<p className={classes['step2Paragraph']}> This Step to ensure you're a real person
 					by adding a phone number
			</p>

			<div className="input-group my-5">
  			<button className= {` ${classes.btnPhoneNum} btn`} type="button" id="phoneNum"> 20</button>
  			<input type="text" className="form-control" placeholder="" />
			</div>

			<p className= {` ${classes['notification']} text-center`}>
				Use this phone number for outbid text notifications?
			</p>

			<div className={`mt-3 pb-5 m-auto ` }>
          <div className="form-check form-check-inline">
            <input className="form-check-input" name="UsePhoneNum" type="radio" id="Yes" value="Yes" checked />
            <label className="form-check-label text-light pl-2" htmlFor="Yes"> Yes</label>
          </div>

          <div className="form-check form-check-inline">
            <input className="form-check-input" name="UsePhoneNum" type="radio" id="No" value="No" />
            <label className="form-check-label text-light pl-5" htmlFor="No">No</label>
          </div>

      </div>

			<div className = {classes['btn-steps']}>
  			<button onClick = {previousHandeler} className="btn btn-primary " type="button">	Previous</button>
  			<button onClick = {nextHandeler} className="btn btn-primary mx-2" type="button"> Next</button>
			</div>


		</div>

	)
}

export default Step2;