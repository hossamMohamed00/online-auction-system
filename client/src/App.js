import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './component/PaymentForm';

// pages
import Register from './Pages/Register';
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './component/UI/Layout.css';

//* Payment
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
	// return (
	// 	<React.Fragment>
	// 		<Routes>
	// 			<Route path="/register" element={<Register />} />
	// 			<Route path="/" element={<Navigate to="/register" />} />
	// 			<Route path="/login" element={<Login />} />
	// 			<Route path="/homePage" element={<HomePage />} />
	// 		</Routes>
	// 	</React.Fragment>
	// );

	//* TEMPORARY Payment code
	<Elements stripe={stripePromise}>
			<PaymentForm />
	</Elements>

	return (
		// <React.Fragment>
		// 	<Routes>
		// 		<Route path="/home-page" element={<HomePage />} />
		// 		<Route path="/" element={<Navigate to="/home-page" />} />

		// 		<Route path="/register" element={<Register />} />

		// 		<Route path="/login" element={<Login />} />
		// 	</Routes>
		// </React.Fragment>
	);
}

export default App;
