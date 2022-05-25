import React from 'react';
import Modal from 'react-bootstrap/Modal';

import {useNavigate} from 'react-router-dom';
import './modal.css'

const Modal_ = props => {
	console.log(props.categoryId);
	const navigate = useNavigate()

	const btnHandler = () => {
		if(props.linkPath){
			navigate(props.linkPath)
		}
		if(props.Id){
			console.log(props.Id)
			props.btnHandler(props.Id)
		}
	}
	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter" className={props.body ? 'hasBorder' : ''}>
					{props.title && props.title}
				</Modal.Title>
				<button className='btn btn-danger align-items-end btn-close-modal' onClick={props.onHide}> X </button>
			</Modal.Header>

			{/* start Modal Body */}
			{props.body && <Modal.Body>{props.body}</Modal.Body>}
			{/* end Modal Body */}

			<Modal.Footer>
				{/* btn show only when delete */}
				<button onClick={btnHandler} className="btn-success btn">
					{props.btnName}
				</button>


				<button onClick={props.onHide} className="btn-danger btn">Close</button>

			</Modal.Footer>
		</Modal>
	);
};

export default Modal_;
