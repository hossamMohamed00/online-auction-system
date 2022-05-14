import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token')
const initialState = {
    isLoggedIn : !!initialToken ,
    idToken : initialToken,
		role:'buyer'

}

const AuthData = createSlice({
    name: "AuthData",
    initialState,
    reducers : {
        login(state , action){
          state.isLoggedIn = !!action.payload.idToken
          state.idToken = action.payload.idToken
					state.role=action.payload.role
          localStorage.setItem('token' , state.idToken)
        },
        logout(state , action){
          state.isLoggedIn = false
          state.idToken = null
          localStorage.removeItem('token')
        }
    }
});

export const AuthDataActions = AuthData.actions ;

export default AuthData.reducer;
