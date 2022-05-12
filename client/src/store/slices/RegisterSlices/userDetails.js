import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	step1Details : {name:'' , email: '', password: '' , role:''},
	step2Details : {phoneNum : ''},
	step4Details : {verifactionCode:'' , ResendBy:''}
}
const userDetails = createSlice({
	name : 'userDetails',
	initialState:initialState ,
	reducers: {
		setStep1Details(state,action) {
			state.step1Details.name 		= action.payload.name
			state.step1Details.email 		= action.payload.email
			state.step1Details.password = action.payload.password
			state.step1Details.role 		= action.payload.role
		},
		setStep2Details(state,action){
			state.step2Details.phoneNum 		= action.payload.phoneNum
		},
		setStep4Details(state,action){
			state.step4Details.verifactionCode = action.payload.verifactionCode
		},
		ResendVerficationCode(state,action){
			state.step4Details.ResendBy = action.payload.ResendBy
		}

	}
})

export const AuthActions = userDetails.actions;

export default userDetails.reducer


