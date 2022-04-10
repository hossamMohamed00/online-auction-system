import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	step1Details : {name:'' , email: '', password: ''},
	step2Details : {phoneNum : ''},
	step3Details : {verficationNum: '' },
	step4Details : {acceptDetails:''}

}
const isAuth = createSlice({
	name : 'RegisterAuth',
	initialState:initialState ,
	reducers: {
		isAuthStep1(state,action) {
			state.step1Details.name 		= action.payload.name
			state.step1Details.email 		= action.payload.email
			state.step1Details.password = action.payload.password

		},
		isAuthStep2(state,action){
			state.step2Details.phoneNum 		= action.payload.phoneNum

		},
		/*isAuthStep3(){

		},
		isAuthStep4(){

		}*/

	}
})

export const AuthActions = isAuth.actions

export default isAuth.reducer


