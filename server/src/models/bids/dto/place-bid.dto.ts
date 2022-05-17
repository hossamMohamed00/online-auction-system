import { IsNumberString } from 'class-validator';

export class PlaceBidDto {
	@IsNumberString()
	bidValue: number;
}
