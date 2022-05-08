import { Injectable, Inject, Logger, forwardRef } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import * as moment from 'moment';
import { AuctionsService } from 'src/models/auction/auctions.service';

@Injectable()
export class StartAuctionSchedulingService {
	private readonly logger = new Logger(StartAuctionSchedulingService.name);

	constructor(
		@Inject(forwardRef(() => AuctionsService)) // To avoid Circular dependency between the tow services
		private readonly auctionService: AuctionsService,
		private readonly schedulerRegistry: SchedulerRegistry,
	) {}

	/**
	 * Used to create new cron job for auction to start automatically
	 * @param auctionId - Cron job name
	 * @param startDate - start date
	 */
	addCronJobForStartAuction(auctionId: string, startDate: Date) {
		const job = new CronJob(startDate, async () => {
			//* Mark the auctions as started
			const result = await this.auctionService.markAuctionAsStarted(auctionId);

			//TODO: Create Cron Job for auction end date
		});

		//* Add the timeout to schedule registry
		this.schedulerRegistry.addCronJob(auctionId, job);
		job.start();

		this.logger.debug(
			'New Cron Job added for start auction at ' + moment(startDate).format(),
		);

		this.getCrons();
	}

	/**
	 * List all cron jobs
	 */
	getCrons() {
		const jobs = this.schedulerRegistry.getCronJobs();
		jobs.forEach((value, key, map) => {
			let next;
			try {
				next = value.nextDates().toDate();
			} catch (e) {
				next = 'error: next fire date is in the past!';
			}
			this.logger.debug(`job: ${key} -> next: ${next}`);
		});
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
