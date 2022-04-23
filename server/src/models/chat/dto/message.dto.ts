import { getCurrentDateFormatted } from 'src/common/utils';

export class Message {
	constructor(message: string, user1IsSender: string) {
		this.message = message;
		this.senderEmail = user1IsSender;

		// Get the current date from moment js
		this.sentAt = getCurrentDateFormatted();
	}

	message: string;

	sentAt: string;

	senderEmail: string;
}
