import React from 'react'
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from './component/login/Login';
import Register from './component/Register/Register'
// import Sidebar from './component/AdminModule/sideBar/sidebar';
import Wrapper from './component/AdminModule/AdminDashboard/Wrapper/Wrapper';

function App() {
	return (
		<React.Fragment>
			{/* <Login></Login> */}
			{/* <Register/> */}
			{/* <Sidebar/> */}

			<Wrapper/>

		</React.Fragment>
	);

}

export default App;
