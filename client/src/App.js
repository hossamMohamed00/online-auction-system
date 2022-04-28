import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './component/UI/Layout.css'

// pages
import Register from './Pages/Register'
import Login from './Pages/Login'
import HomePage from './Pages/HomePage';


function App() {
	return (
		<React.Fragment>

			<Routes>
				<Route path='/home-page' element={<HomePage/>} />
				<Route path='/' element={<Navigate to="/home-page" /> } />


				<Route path='/register' element={<Register/>} />

				<Route path='/login' element={<Login/>} />

			</Routes>

		</React.Fragment>
	);

}

export default App;
