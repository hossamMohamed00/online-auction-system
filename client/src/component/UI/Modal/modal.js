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
				<button className='btn btn-danger align-items-end btn-close-modal' onClick={props.onHide}> X </button>
			</Modal.Header>
			{props.body && <Modal.Body>{props.body}</Modal.Body>}
			<Modal.Footer>
				{/* btn show only when delete */}
				{props.Id && <button onClick={() => props.btnHandler(props.Id)} className="btn-success btn">
					{props.btnName}
				</button>
				}
				<button onClick={props.onHide} className="btn-danger btn">Close</button>

			</Modal.Footer>
		</Modal>
	);
};

export default Modal_;
