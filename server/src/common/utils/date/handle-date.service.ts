import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

/**
 * This service combine all methods that work with date
 */

@Injectable()
export class HandleDateService {
	constructor() {}

	//? Set the format of the date in chat message
	private static readonly dateFormatForChatMessage: string =
		'dddd, MMMM Do YYYY, h:mm:ss a';

	private static readonly auctionEndDateDifference: number = 7;

	private static readonly auctionSDValidDurationInMonths: number = 2;

	/**
	 * Use moment to get the current date in good format
	 * @returns string representing the date in simple format
	 */
	public static getCurrentDateFormatted(): string {
		return moment().format(this.dateFormatForChatMessage);
	}

	/**
	 * Use moment to add period of time to the given start date
	 * @param auctionStartDate - Auction start date
	 * @returns End date for the auction
	 */
	public static getNewEndDateFromStartDate(auctionStartDate: Date) {
		//FIXME: Get it back to valid period
		// return moment(auctionStartDate).add(this.auctionEndDateDifference, 'days');

		//* JUST FOR TESTING PURPOSE
		return moment(auctionStartDate).add(10, 'minutes');
	}

	/**
	 * Check if the given date is between today and 2 months or not
	 * @param startDate
	 * @boolean true if valid, false otherwise
	 */
	public static isValidAuctionStartDate(startDate: Date) {
		const dateAfter2Months = moment().add(
			this.auctionSDValidDurationInMonths,
			'months',
		);
		return moment(startDate).isBetween(undefined, dateAfter2Months); // moment(undefined) evaluates as moment()
	}

	/**
	 * Check if given date is in the past
	 * @param date
	 */
	public static isInPast(date: Date): boolean {
		//* Check if the given date is in the paste or not
		return moment(date).isBefore(moment());
	}

	/**
	 * Get tomorrow date
	 * @returns Tomorrow Date
	 */
	public static getTomorrowDate() {
		//* Get tomorrow date
		return moment().add(1, 'days').toDate();
	}
}
