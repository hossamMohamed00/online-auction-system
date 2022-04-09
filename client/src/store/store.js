import { configureStore } from "@reduxjs/toolkit";
import Register from './slices/Register'
import isAuth from "./slices/RegisterSlices/isAuth";


const store = configureStore({
	reducer:{
		RegisterSteps : Register,
		RegisterAuth  : isAuth
	}
})

export default store;