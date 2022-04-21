import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';

// pages
import Register from './Pages/Register'
import Login from './Pages/Login'
import HomePage from './Pages/HomePage';

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import Login from './component/login/Login';
// import Register from './component/Register/Register'
// import Sidebar from './component/AdminModule/sideBar/sidebar';
import Wrapper from './component/AdminModule/AdminDashboard/Wrapper/Wrapper';
import './component/UI/Layout.css'


function App() {
	return (
		<React.Fragment>

			{/* <Routes>
				<Route path='/register' element={<Register/>} />
				<Route path='/' element={<Navigate to="/register" /> } />

				<Route path='/login' element={<Login/>} />
				<Route path='/homePage' element={<HomePage/>} />

			</Routes> */}
			<Wrapper/>

		</React.Fragment>
	);

}

export default App;
