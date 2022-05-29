import React from 'react';
import { useSelector } from 'react-redux';
<<<<<<< HEAD
import './profile.css';
import coverImg from '../../../assets/fbc2a961bfd0e7b5673a7922cb848cdb.jpg';
import profileImg from '../../../assets/download.png';
import { CardsContainer } from './../../AdminModule/AdminDashboard/dashboard_content/card_content/CardsContainer';
import useFilter from '../TableLayout/FilteringTable/filter';
import DataTable from 'react-data-table-component';
const UserProfile = props => {
	const role = useSelector(store => store.AuthData.role);
	const data=[];
  const	columns=[]

	//filter
	const items = data ? data : [];
	const { filterFun, filteredItems } = useFilter(items, 'name');
	//end filter
=======
import PageHeader from '../../UI/Page Header/pageHeader';
import './profile.css';
import { Col, Row } from 'react-bootstrap';

const UserProfile = props => {
	const role = useSelector(store => store.AuthData.role);
>>>>>>> main
	return (
		<>
			<div className="container-fluid container_profile">
				<section className="header_container position-relative">
					<header className="header">
						<img src={coverImg} />
						<div className="profile">
							<img src={profileImg} />
							<h5 className="text-light">{props.name}</h5>
							<p>{role}</p>
							{role === 'admin' ||
								(role === 'employee' && (
									<button className="btn btn-danger">Block</button>
								))}
						</div>
					</header>
				</section>
				<hr className="bg-light profileHr1" />

				<section className="profile_content">
					{/* <div className="profile_cards">
						<CardsContainer
							title="joined Auctions"
							cards={props.cards}
							class="profile_card "
							card-class="cardP"
						/>
					</div> */}
					{/* <hr className="bg-light profileHr2" /> */}
					<div className="profile_table">
						<h2 className="text-light mt-2 fw-bold">Joined Auctions</h2>
						{data && (
							<DataTable
								// selectableRows
								columns={columns}
								data={filteredItems}
								subHeader
								subHeaderComponent={filterFun}
								theme="dark"
								pagination
							/>
						)}
					</div>
				</section>
			</div>
		</>
	);
};
export default UserProfile;
