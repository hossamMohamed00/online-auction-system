import React, { useEffect, useState } from 'react';
import { Col,Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getWalletBalance, getWalletTransactions } from '../../../../Api/BuyerApi';
import useHttp from '../../../../CustomHooks/useHttp';

import PageContent from '../../../UI/DashboardLayout/Pagecontant/pageContent';
import PageHeader from '../../../UI/Page Header/pageHeader'

import BuyerDashboardContent from '../BuyerDashboard';


const WalletTransaction = () => {
		// get num of widthdraw transaction
		const [n_widthdraw , setWithdrawNum] = useState('')
		const [n_deposite , setDepositeNum] = useState('')

		// get wallet balance
		const idToken = useSelector(store=>store.AuthData.idToken)
		const {sendRequest , status , data} = useHttp(getWalletBalance);
		useEffect(()=>{
			sendRequest(idToken)
		},[sendRequest ])

		// get wallet Transactions
		const {sendRequest:sendRequestForWalletTrans , status:statusForWalletTrans , data:dataForWalletTrans} = useHttp(getWalletTransactions);
		useEffect(()=>{
			sendRequestForWalletTrans(idToken)
		},[sendRequestForWalletTrans])

		useEffect(()=>{
			if(statusForWalletTrans==='completed'){
				setDepositeNum(dataForWalletTrans.filter(trans => trans.transactionType==="deposit").length)
				setWithdrawNum(dataForWalletTrans.filter(trans => trans.transactionType==="withdrawal").length)
			}
		},[statusForWalletTrans])

		console.log(n_deposite , n_widthdraw)


	return (
		<BuyerDashboardContent>
			<PageContent>
				<PageHeader text ="Wallet Transactions" showLink={false} />
				<Row className='w-100 p-0 m-0 px-3'>
					<Col lg="4" >
						<div className='w-100 my-4 pt-4 d-flex flex-column justify-content-center bg-dark text-light text-center rounded-3'>
							<h5 className='fw-bold pb-2'>  Withdraw Transactions </h5>
							<h5 className='bg-danger py-2 m-0'> {statusForWalletTrans==='completed'  && dataForWalletTrans && n_widthdraw} </h5>
						</div>
					</Col>

					<Col lg="4" >
						<div className='w-100 my-4 pt-4 d-flex flex-column justify-content-center bg-dark text-light text-center rounded-3'>
							<h5 className='fw-bold pb-2'>  Your Balance </h5>
							<h5 className='bg-primary py-2 m-0'> {status==='completed'  && data && data.balance} </h5>
						</div>
					</Col>
					<Col lg="4" >
						<div className='w-100 my-4 pt-4 d-flex flex-column justify-content-center bg-dark text-light text-center rounded-3'>
							<h5 className='fw-bold pb-2'>   Deposit Transactions</h5>
							<h5 className='bg-success py-2 m-0'> {statusForWalletTrans==='completed'  && dataForWalletTrans && n_deposite} </h5>
						</div>
					</Col>
				</Row>
			</PageContent>
		</BuyerDashboardContent>
	);
}

export default WalletTransaction;