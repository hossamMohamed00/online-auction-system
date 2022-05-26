import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import toast

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './component/Modules/BuyerModule/Payment/PaymentForm';

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
import OngoingAuctionsPage from './component/AdminModule/AdminDashboard/AuctionsPages/upComingAuctions';
import PendingAuctions from './component/AdminModule/AdminDashboard/AuctionsPages/pendingAuction';
import ManageCategories from './component/AdminModule/AdminDashboard/ManageCategories/manageCategories';
// end admin pages
// profile pages
import BuyerProfile from './Pages/buyerProilePage';

// start buyer pages
import BuyerDashboard from './Pages/BuyerDashboard';
import Chat from './component/UI/Chat/Chat';
import SavedAuctions from './component/Modules/BuyerModule/Auctions/SavedAuctions';
import ViewParticipatingAuctions from './component/Modules/BuyerModule/Auctions/ViewParticipatingAuctions';
// end buyer pages

// start seller pages
import SellerDashboard from './Pages/SellerDashboard';
import ViewAllAuctions from './component/Modules/SellerModule/SellerPages/ViewAllAuctions';
import SellerChat from './component/Modules/SellerModule/SellerPages/SellerChat';
import BuyerChat from './component/Modules/BuyerModule/BuyerChat';
// end seller pages

//* Payment
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
	const isLoggedIn = useSelector(store => store.AuthData.isLoggedIn);
	const role = useSelector(store => store.AuthData.role);

	console.log(role);

	return (
		<React.Fragment>
			{/* start Routes of admin*/}

			{/* //* TEMPORARY Payment code */}

			{/* <Elements stripe={stripePromise}>
				<PaymentForm />
			</Elements> */}

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
				<Route path="/buyerProfile" element={<BuyerProfile />} />

				{/* start Admin Routes */}
				{isLoggedIn && role === 'admin' && (
					<Route path="/adminDashboard" element={<AdminPage />} />
				)}
				<Route path="/adminDashboard/adminProfile" element={<ProfilePage />} />
				<Route
					path="/adminDashboard/ongoingAuctions"
					element={<OngoingAuctionsPage />}
				/>
				<Route
					path="/adminDashboard/currentAuctions"
					element={<CurrentAuctionsPage />}
				/>
				<Route
					path="/adminDashboard/pendingAuctions"
					element={<PendingAuctions />}
				/>
				<Route path="/adminDashboard/allUsersPage" element={<UsersPage />} />
				<Route path="/adminDashboard/sellersPage" element={<SellersPage />} />
				<Route path="/adminDashboard/buyersPage" element={<BuyersPage />} />
				<Route path="/adminDashboard/addEmployee" element={<AddEmployee />} />
				<Route
					path="/adminDashboard/listAllEmployees"
					element={<ListAllEmployees />}
				/>
				<Route
					path="/adminDashboard/manageCategories"
					element={<ManageCategories />}
				/>
				{/* end Admin Routes */}

				{/* start buyer routes  */}

				{isLoggedIn && role === 'buyer' && (
					<>
						<Route path="/buyer-dashboard" element={<BuyerDashboard />} />
						<Route path="/buyer-dashboard/chat" element={<BuyerChat />} />
						{/* Buyer Auctions */}
						<Route
							path="/buyer-dashboard/saved-auctions"
							element={<SavedAuctions />}
						/>
						<Route
							path="/buyer-dashboard/participating-auctions"
							element={<ViewParticipatingAuctions />}
						/>
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
