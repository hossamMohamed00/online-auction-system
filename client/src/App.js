import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// pages
import Register from './Pages/Register';
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';
import UsersPage from './component/AdminModule/AdminDashboard/UsersPages/Users';
import SellersPage from './component/AdminModule/AdminDashboard/UsersPages/Sellers';
import BuyersPage from './component/AdminModule/AdminDashboard/UsersPages/Buyers';
import AdminPage from './Pages/AdminDashboard';
import ProfilePage from './component/AdminModule/AdminDashboard/ProfilePage/profilePage';
import CurrentAuctionsPage from './component/AdminModule/AdminDashboard/AuctionsPages/currentAuctions';
import OngoingAuctionsPage from './component/AdminModule/AdminDashboard/AuctionsPages/ongoingAuctions';

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './component/UI/Layout.css';

function App() {
	return (
		<React.Fragment>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<Navigate to="/register" />} />

				<Route path="/login" element={<Login />} />
				<Route path="/homePage" element={<HomePage />} />
				{/* start Routes of admin */}
				<Route path="/adminDashboard" element={<AdminPage />} />
				<Route path="/adminDashboard/adminProfile" element={<ProfilePage />} />
				<Route
					path="/adminDashboard/ongoingAuctions"
					element={<OngoingAuctionsPage />}
				/>
				<Route
					path="/adminDashboard/currentAuctions"
					element={<CurrentAuctionsPage />}
				/>

				<Route path="/adminDashboard/allUsersPage" element={<UsersPage />} />
				<Route path="/adminDashboard/sellersPage" element={<SellersPage />} />
				<Route path="/adminDashboard/buyersPage" element={<BuyersPage />} />
			</Routes>
			{/* <UsersPage/> */}
		</React.Fragment>
	);
}

export default App;
