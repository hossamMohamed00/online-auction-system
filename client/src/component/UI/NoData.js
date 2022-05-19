import React from 'react';


const NoData = ({text , data , error}) => {
	console.log(error)
	return (
		<>

		{data && (data.length===0) &&
			<div>
				<div className="alert alert-danger text-center col-md-9 col-xs-12 m-auto mt-3 " role="alert"> <h5> {text} </h5>  </div>
			</div>
		}
		{!data &&
			<div>
				<div className="alert alert-danger text-center col-md-9 col-xs-12 m-auto mt-3 " role="alert"> <h5> {error && error} </h5>  </div>
			</div>
		}
		</>
	);
}

export default NoData;