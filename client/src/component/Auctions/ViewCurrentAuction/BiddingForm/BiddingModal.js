import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import {useSelector} from 'react-redux'
import {Link } from 'react-router-dom'
import classes from './BiddingModal.module.css'


const BiddingModal = (props) => {

	const [BidValue , setBidValue ] = useState(1500)
	const [isBidValid , setIsBidValid] = useState(true)

 	const isLoggedIn = useSelector(store => store.AuthData.isLoggedIn)

	const BidValueValidation = (e) => {
		setBidValue(e.target.value)
		if(e.target.value.trim() < 1500){
			setIsBidValid(false)
		}
		else{setIsBidValid(true)}
	}
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
			className={classes.BiddingModal}
    >
      <Modal.Header closeButton className={classes.BiddingModalHeader}>
        <Modal.Title id="contained-modal-title-vcenter"  >
          {isLoggedIn && <h2 className='fw-bold'>Place a Bid </h2>}
					{!isLoggedIn && <h3 className='text-center pt-3'> Please Login in First, before placing a bid </h3>}
        </Modal.Title>
      </Modal.Header>
			{isLoggedIn &&
				<Modal.Body className={classes.BiddingModalBody}>
					<div className={` ${classes['ModalBodyForm']} ${!isBidValid ?'pb-2' :'' }`}>
						<div className="input-group">
							<input type="number" className="form-control" min="1500" value={BidValue} onChange={BidValueValidation }/>
							<span className={` input-group-text ${classes['input-group-text']} `}>$</span>
						</div>
						{!isBidValid && <p className='px-2'>You must bid at least <span className={classes.bidValue}> 1500 $ </span></p> }
					</div>

					<div className= 'pt-4'>
						<div className='d-flex justify-content-between'>
							<p> Your Balance </p>
							<p> 75,200 $ </p>
						</div>

						<div className='d-flex justify-content-between'>
							<p> Service Fee </p>
							<p> 5 $ </p>
						</div>

						<div className='d-flex justify-content-between'>
							<p> Total Bid  </p>
							<p className={!isBidValid ? classes['Alarm'] : ''} > {BidValue ? parseInt(BidValue) + 5 : 5 } $ </p>
						</div>
					</div>
				</Modal.Body>
			}

      <Modal.Footer className={classes['HideBorder']}>
				<div className="d-flex gap-2 col-12 mx-auto">
					{isLoggedIn && <button className={`btn col-6 fw-bold bg-light ${classes.btnPlaceMyBid}`} type="button" > Place My Bid </button> }
					{!isLoggedIn && <Link className={`btn col-6 fw-bold bg-light ${classes.btnPlaceMyBid}`} type="button" to="/login" >
						Login
					</Link> }
					<button className={`btn col-6 fw-bold bg-danger ${classes.btnCloseModal}`} type="button" onClick={props.onHide}> Close </button>

				</div>
      </Modal.Footer>
    </Modal>
  );
}

export default BiddingModal;