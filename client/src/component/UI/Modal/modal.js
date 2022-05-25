import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './modal.css'

const Modal_ = props => {
	console.log(props.categoryId);
	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{props.title && props.title}
				</Modal.Title>
			</Modal.Header>
			{props.body && <Modal.Body>{props.body}</Modal.Body>}
			<Modal.Footer>
				<button onClick={props.onHide}>Close</button>
				<button onClick={() => props.btnHandler(props.categoryId)}>
					{props.btnName}
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default Modal_;
