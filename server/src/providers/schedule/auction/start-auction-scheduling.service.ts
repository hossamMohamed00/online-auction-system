import { Injectable, Logger } from '@nestjs/common';
import {
	Cron,
	CronExpression,
	Interval,
	SchedulerRegistry,
	Timeout,
} from '@nestjs/schedule';
import { CronJob } from 'cron';
import * as moment from 'moment';

@Injectable()
export class StartAuctionSchedulingService {
	constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

	private readonly logger = new Logger(StartAuctionSchedulingService.name);

	// @Cron(moment().add(2, 'seconds').toDate())
	@Timeout('start_auction', moment().milliseconds())
	startAuction() {}

	/**
	 * Used to create new timeout for auction to start automatically
	 * @param timeoutName - Timeout name
	 * @param startDateInMs - start date in ms
	 */
	addTimeout(timeoutName: string, startDateInMs: number) {
		const callback = () => {
			this.logger.warn(
				`New timeout created and will executing after (${moment(
					startDateInMs,
				).toDate()})!`,
			);
		};

		const timeout = setTimeout(callback, startDateInMs);

		// Add the timeout to schedule registry
		this.schedulerRegistry.addTimeout(timeoutName, timeout);
	}
}

/*
 ┌────────────── second (optional)
 │ ┌──────────── minute
 │ │ ┌────────── hour
 │ │ │ ┌──────── day of the month
 │ │ │ │ ┌────── month
 │ │ │ │ │ ┌──── day of week (0 or 7 are Sunday)
 │ │ │ │ │ │
 │ │ │ │ │ │
 * * * * * *
*/
