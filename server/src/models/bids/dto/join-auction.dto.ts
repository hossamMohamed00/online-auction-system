import { IsMongoId } from 'class-validator';

export class JoinAuctionDto {
	@IsMongoId({ message: 'Invalid auction id ❌' })
	auctionId: string;
}
