import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	step1Details : {name:'' , email: '', Password: ''}
}
const isAuth = createSlice({
	name : 'RegisterAuth',
	initialState:initialState ,
	reducers: {
		isAuthStep1(state,action) {
			state.step1Details.name = action.payload.name
		},
		/*isAuthStep2(){

		},
		isAuthStep3(){

		},
		isAuthStep4(){

		}*/

	}
})

export const AuthActions = isAuth.actions

export default isAuth.reducer


