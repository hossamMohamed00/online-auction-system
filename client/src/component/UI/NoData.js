import React from 'react';


const NoData = ({text , data , error}) => {
	console.log(error)
	return (
		<>

		{data && (data.length===0) &&
			<div>
				<div className="alert alert-danger text-light text-center col-md-9 col-xs-12 mx-auto my-5 " role="alert"> <h5 className='fw-bolder'> {text} </h5>  </div>
			</div>
		}
		{!data &&
			<div>
				<div className="alert alert-dangertext-light text-center col-md-9 col-xs-12 mx-auto my-5  " role="alert"> <h5> {error && error} </h5>  </div>
			</div>
		}
		</>
	);
}

export default NoData;