import React from 'react';
import Modal from 'react-bootstrap/Modal';

import './modal.css';

const Modal_ = props => {
	const btnHandler = () => {
		if (props.Id) {
			console.log(props.Id);
			props.btnHandler(props.Id);
		}
		if (!props.Id) {
			props.btnHandler();
		}
	};
	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title
					id="contained-modal-title-vcenter"
					className={props.body ? 'hasBorder' : ''}
				>
					{props.title && props.title}
				</Modal.Title>
				<button
					className="btn btn-danger align-items-end btn-close-modal"
					onClick={props.onHide}
				>
					{' '}
					X{' '}
				</button>
			</Modal.Header>

			{/* start Modal Body */}
			{props.body && <Modal.Body> {props.body} </Modal.Body>}
			{/* end Modal Body */}

			<Modal.Footer
				className={props.btnFooterStyle ? props.btnFooterStyle : ''}
			>
				{/* btn show only when delete */}
				{props.btnName && (
					<button onClick={btnHandler} className="btn-success btn">
						{props.btnName}
					</button>
				)}
				<button onClick={props.onHide} className="btn-danger btn ">
					Close
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default Modal_;
