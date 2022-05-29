import React from 'react';
import '../admin.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
export const CardsContainer = props => {
	return (
		<div
			className={`  ${props.class ? props.class : 'card_container'}  row m-0`}
		>
			<h2 className="text-light text-center pb-4 pt-2  fw-bolder">
				{props.title}
			</h2>

			{props.cards.map(card => {
				return (
					<>
						<div
							className={` col-lg-4 ${props['card-class']}  fw-bolder text-center card_
							h-100 mb-3`}
						>
							{card.name}
							<h1 className="text-center text-danger mt-2 fw-border">
								{card.number}
							</h1>
							{card.path && (
								<Link to={card.path}>
									<span className="text-right icon">
										<FontAwesomeIcon icon={faArrowRight} />
									</span>
								</Link>
							)}
						</div>
					</>
				);
			})}
		</div>
	);
};
