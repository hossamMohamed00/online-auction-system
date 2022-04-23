export class Message {
	constructor(message: string, user1IsSender: string) {
		this.message = message;
		this.senderEmail = user1IsSender;
	}

	message: string;

	sentAt: Date;

	senderEmail: string;
}
