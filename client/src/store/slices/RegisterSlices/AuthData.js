import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token')
const initialState = {
    isLoggedIn : !!initialToken ,
    idToken : initialToken
}

const AuthData = createSlice({
    name: "AuthData",
    initialState,
    reducers : {
        login(state , action){
          state.isLoggedIn = !!action.payload.idToken
          state.idToken = action.payload.idToken
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
