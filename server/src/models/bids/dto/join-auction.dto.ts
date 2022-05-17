import { IsString } from 'class-validator';

export class JoinAuctionDto {
	@IsString()
	auctionId: string;
}
