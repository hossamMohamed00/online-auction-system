import React, { Fragment } from "react";
import Card from "../UI/Card/Card";

import Step1 from "../Steps/Step1";
import Step2 from "../Steps/Step2";
import Step3 from "../Steps/Step3";
import Step4 from "../Steps/Step4";


import { useSelector } from "react-redux";

const RegisterContent = () => {
	const step1 = useSelector((store) => store.RegisterSteps.step1)
	const step2 = useSelector((store) => store.RegisterSteps.step2)
	const step3 = useSelector((store) => store.RegisterSteps.step3)
	const step4 = useSelector((store) => store.RegisterSteps.step4)


	return (
		<Fragment>
			<Card>
				{step1 && <Step1 />}
				{step2 && <Step2 />}
				{step3 && <Step3 />}
				{step4 && <Step4 />}
			</Card>

			<p className="text-light mt-4 text-center "> Already have an account ? <span className="text-primary pe-auto"> Sign in </span></p>
		</Fragment>
	)
}

export default RegisterContent;