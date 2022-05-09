import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './component/UI/Layout.css'

// pages
import Register from './Pages/Register'
import LoginPage from './Pages/Login'
import HomePage from './Pages/HomePage';
import AboutUsPage from './Pages/AboutUsPage';
import ContactUsPage from './Pages/ContactUsPage';
import HowBidPage from './Pages/HowBidPage';
import PageNotFound from './Pages/PageNotFound';
import ViewCategoryAuctions from './component/Auctions/ViewCategoryAuctions/ViewCategoryAuctions';
import ViewAuctions from './Pages/ViewAuctions';


function App() {
	return (
		<React.Fragment>

			<Routes>
				<Route path='/home-page' element={<HomePage/>}/>
				<Route path='/' element={<Navigate to="/home-page" /> } />

				<Route path='/register' element={<Register/>} />
				<Route path='/login' element={<LoginPage/>} />

				<Route path='/how-bid' element={<HowBidPage/>} />
				<Route path='/about-us' element={<AboutUsPage/>} />
				<Route path='/contact-us' element={<ContactUsPage/>} />

				<Route path='/auctions' element={<ViewAuctions/>} exact/>
				<Route path='/categories' element={<ViewCategoryAuctions/>} />



				<Route path="*" element={<PageNotFound />} />

			</Routes>

		</React.Fragment>
	);

}

export default App;
