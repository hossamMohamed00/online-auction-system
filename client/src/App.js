import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './component/UI/Layout.css';
import './component/UI/Layout.css';

// pages

// start home Pages
import Register from './Pages/Register';
import LoginPage from './Pages/Login';
import HomePage from './Pages/HomePage';
import AboutUsPage from './Pages/AboutUsPage';
import ContactUsPage from './Pages/ContactUsPage';
import HowBidPage from './Pages/HowBidPage';
import PageNotFound from './Pages/PageNotFound';
import ViewCategoryAuctions from './component/Auctions/ViewCategoryAuctions/ViewCategoryAuctions';
import ViewAuctions from './Pages/ViewAuctions';
// end home Pages

// start admin pages
import UsersPage from './component/AdminModule/AdminDashboard/UsersPages/Users';
import AddEmployee from './component/AdminModule/AdminDashboard/ManageEmployees/AddEmployee';
import ListAllEmployees from './component/AdminModule/AdminDashboard/ManageEmployees/ListAllEmployees/listAllEmployee';
import SellersPage from './component/AdminModule/AdminDashboard/UsersPages/Sellers';
import BuyersPage from './component/AdminModule/AdminDashboard/UsersPages/Buyers';
import AdminPage from './Pages/AdminDashboard';
import ProfilePage from './component/AdminModule/AdminDashboard/ProfilePage/profilePage';
import CurrentAuctionsPage from './component/AdminModule/AdminDashboard/AuctionsPages/currentAuctions';
import UpcomingAuctionsPage from './component/AdminModule/AdminDashboard/AuctionsPages/upComingAuctions';
import PendingAuctions from './component/AdminModule/AdminDashboard/AuctionsPages/pendingAuction';
import ManageCategories from './component/AdminModule/AdminDashboard/ManageCategories/manageCategories';
// end admin pages
// profile pages
import BuyerProfile from './Pages/buyerProilePage';

// start buyer pages
import BuyerDashboard from './Pages/BuyerDashboard';
import SavedAuctions from './component/Modules/BuyerModule/Auctions/SavedAuctions';
import ViewParticipatingAuctions from './component/Modules/BuyerModule/Auctions/ViewParticipatingAuctions';
// end buyer pages

// start seller pages
import SellerDashboard from './Pages/SellerDashboard';
import ViewAllAuctions from './component/Modules/SellerModule/SellerPages/ViewAllAuctions';
import SellerChat from './component/Modules/SellerModule/SellerPages/SellerChat';
import BuyerChat from './component/Modules/BuyerModule/BuyerChat';
import AddAuction from './component/Modules/SellerModule/SellerPages/AddNewAuction';
import AllAuctions from './component/AdminModule/AdminDashboard/AuctionsPages/AllAuctions';
import { EmployeeDashBoard } from './component/Modules/EmployeesModule/Employee';
import AllCompliments from './component/Modules/EmployeesModule/AllCompliments/AllCompliments';
import Wallet from './component/Modules/BuyerModule/Payment/Wallet.';
import WalletTransaction from './component/Modules/BuyerModule/WalletTransaction/WalletTransaction';
import SellerProfilePage from './Pages/SellerProfilePage';
// end seller pages

function App() {

	const isLoggedIn = useSelector(store => store.AuthData.isLoggedIn);
	const role = useSelector(store => store.AuthData.role);

	return (
		<React.Fragment>
			{/* start Routes of admin*/}
			<Routes>
				{/* start Home Page Routes */}
				<Route path="/home-page" element={<HomePage />} />
				<Route path="/" element={<Navigate to="/home-page" />} />

				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<LoginPage />} />

				<Route path="/how-bid" element={<HowBidPage />} />
				<Route path="/about-us" element={<AboutUsPage />} />
				<Route path="/contact-us" element={<ContactUsPage />} />

				<Route path="/auctions" element={<ViewAuctions />} exact />
				<Route path="/categories" element={<ViewCategoryAuctions />} />
				{/* end Home Page Routes */}
				{/* profile */}
				<Route path="/buyerProfile" element={<BuyerProfile />} />
				<Route path={`/seller`} element={<SellerProfilePage />} />

				{/* start Admin Routes */}
				{isLoggedIn && role === 'admin' && (
					<Route path="/adminDashboard" element={<AdminPage />} />
				)}
				<Route path="/adminDashboard/adminProfile" element={<ProfilePage />} />
				<Route
					path="/managersDashboard/allAuctions"
					element={<AllAuctions />}
				/>
				<Route
					path="/managersDashboard/upcomingAuctions"
					element={<UpcomingAuctionsPage />}
				/>
				<Route
					path="/managersDashboard/currentAuctions"
					element={<CurrentAuctionsPage />}
				/>
				<Route
					path="/managersDashboard/pendingAuctions"
					element={<PendingAuctions />}
				/>
				<Route path="/managersDashboard/allUsersPage" element={<UsersPage />} />
				<Route
					path="/managersDashboard/sellersPage"
					element={<SellersPage />}
				/>
				<Route path="/managersDashboard/buyersPage" element={<BuyersPage />} />
				<Route
					path="/managersDashboard/addEmployee"
					element={<AddEmployee />}
				/>
				<Route
					path="/managersDashboard/listAllEmployees"
					element={<ListAllEmployees />}
				/>
				<Route
					path="/managersDashboard/manageCategories"
					element={<ManageCategories />}
				/>
				{/* end Admin Routes */}
				{/* start route Employees */}
				<Route path="/employeeDashBoard" element={<EmployeeDashBoard />} />
				<Route
					path="/managersDashboard/allCompliments"
					element={<AllCompliments />}
				/>

				{/* start buyer routes  */}

				{isLoggedIn && role === 'buyer' && (
					<>
						<Route path="/buyer-dashboard" element={<BuyerDashboard />} />
						<Route path="/buyer-dashboard/chat" element={<BuyerChat />} />
						{/* start Buyer Auctions */}
						<Route
							path="/buyer-dashboard/saved-auctions"
							element={<SavedAuctions />}
						/>
						<Route
							path="/buyer-dashboard/participating-auctions"
							element={<ViewParticipatingAuctions />}
						/>
						{/* end Buyer Auctions */}

						{/* start Payment */}
						<Route path="/buyer-dashboard/chargeWallet" element={<Wallet />} />

						<Route
							path="/buyer-dashboard/viewWalletTransaction"
							element={<WalletTransaction />}
						/>
						{/* end Payment */}
					</>
				)}

				{/* end buyer routes  */}

				{/* start seller routes  */}
				{isLoggedIn && role === 'seller' && (
					<>
						<Route path="/seller-dashboard" element={<SellerDashboard />} />
						<Route
							path="/seller-dashboard/viewAllAuctions"
							element={<ViewAllAuctions />}
						/>
						<Route
							path="/seller-dashboard/AddAuction"
							element={<AddAuction />}
						/>
						<Route path="/seller-dashboard/chat" element={<SellerChat />} />
					</>
				)}
				{/* end seller routes  */}

				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</React.Fragment>
	);
}

export default App;
