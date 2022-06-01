import { createSlice } from '@reduxjs/toolkit';

const initialState = { step1: true, step2: false, step3: false, step4: false };

const Register = createSlice({
	name: 'RegisterSteps',
	initialState,
	reducers: {
		showStep1(state, actions) {
			state.step1 = true;
			state.step2 = false;
			state.step3 = false;
			state.step4 = false;
		},
		showStep2(state, actions) {
			state.step1 = false;
			state.step2 = true;
			state.step3 = false;
			state.step4 = false;
		},
		showStep3(state, actions) {
			state.step1 = false;
			state.step2 = false;
			state.step3 = true;
			state.step4 = false;
		},
		showStep4(state, actions) {
			state.step1 = false;
			state.step2 = false;
			state.step3 = false;
			state.step4 = true;
		},
	},
});

export const RegisterActions = Register.actions;

export default Register.reducer;
