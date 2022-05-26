import { IsNumberString, IsString } from 'class-validator';

export class PlaceBidDto {
	@IsString()
	room: string;

	@IsNumberString()
	bidValue: number;
}
