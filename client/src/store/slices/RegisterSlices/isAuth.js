import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	step1Details : {name:'' , email: '', password: ''},
	step2Details : {phoneNum : ''},
	step3Details : {acceptDetails: '' },
	step4Details : {verifactionCode:'' , ResendBy:''}

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
		isAuthStep3(state,action){
			state.step3Details.acceptDetails = action.payload.acceptDetails
		},
		isAuthStep4(state,action){
			state.step4Details.verifactionCode = action.payload.verifactionCode
		},
		ResendVerficationCode(state,action){
			state.step4Details.ResendBy = action.payload.ResendBy
		}

	}
})

export const AuthActions = isAuth.actions

export default isAuth.reducer


