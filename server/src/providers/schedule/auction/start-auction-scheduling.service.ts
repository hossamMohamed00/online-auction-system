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
			await this.auctionService.markAuctionAsStarted(auctionId);

			//? Get auction end date to create bew cron job
			const result = await this.auctionService.getAuctionEndDate(auctionId);

			//* Remove this cron job to avoid duplicate problem
			this.deleteCron(auctionId);

			//* Create Cron Job for auction end date
			this.addCronJobForEndAuction(auctionId, result.endDate);
		});

		//* Add the cron job to schedule registry
		this.schedulerRegistry.addCronJob(auctionId, job);
		job.start();

		this.logger.debug(
			'New Cron Job added for start auction at ' + moment(startDate).format(),
		);

		this.getCrons();
	}

	/**
	 * Used to create new cron job for auction to start automatically
	 * @param auctionId - Cron job name
	 * @param endDate - start date
	 */
	addCronJobForEndAuction(auctionId: string, endDate: Date) {
		const job = new CronJob(endDate, async () => {
			//* Mark the auctions as ended
			await this.auctionService.markAuctionAsEnded(auctionId);

			//* Remove this cron job to avoid duplicate problem
			this.deleteCron(auctionId);
		});

		//* Add the cron job to schedule registry
		this.schedulerRegistry.addCronJob(auctionId, job);
		job.start();

		this.logger.warn(
			'New Cron Job added for end auction at ' + moment(endDate).format(),
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

	/**
	 * Delete specified cron job
	 * @param name
	 */
	deleteCron(name: string) {
		this.schedulerRegistry.deleteCronJob(name);
		this.logger.warn(`Cron job of auction ${name} deleted!`);
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
