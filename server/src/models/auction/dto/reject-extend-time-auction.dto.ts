import { IsNotEmpty, IsString } from 'class-validator';

export class RejectExtendTimeDto {
	@IsString()
	message: string = 'Time Is Over 😒';
}
