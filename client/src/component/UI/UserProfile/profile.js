import React from 'react';
import { useSelector } from 'react-redux';
import PageHeader from '../../UI/Page Header/pageHeader';
import './profile.css';
import { Col, Row } from 'react-bootstrap';

const UserProfile = props => {
	const role = useSelector(store => store.AuthData.role);
	return (
		<>
			<PageHeader text={`Welcome ${props.name}`} showLink={false} />
			<div className="container ">
				<Row className="h-100">
					<Col
						lg={4}
						md={6}
						// className={`${classes.chatList} ${scollbarStyle.scollbar}`}
					>
						<h3 className="text-center text-light fw-bold">Profile details</h3>
						<div className="row">
							<img src={props.img} />
						</div>
						<div className="row">
							<h2 className="text-light ">{props.email}</h2>
						</div>
						{role === 'admin' && (
							<div className="row buttons">
								<button className="btn btn-danger col-lg-6 mx-2">Block</button>
								<button className="btn btn-warning col-lg">Worn</button>
							</div>
						)}
					</Col>
					<Col lg={8} md={6}>
						<h3 className="text-center text-light fw-bold">{props.dataName}</h3>
					</Col>
				</Row>
			</div>
		</>
	);
};
export default UserProfile;
