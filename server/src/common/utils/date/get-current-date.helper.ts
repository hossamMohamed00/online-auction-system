import * as moment from 'moment';

/**
 * Use moment to get the current date
 * @returns string representing the date in simple format
 */
export function getCurrentDateFormatted(): string {
	return moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
}
