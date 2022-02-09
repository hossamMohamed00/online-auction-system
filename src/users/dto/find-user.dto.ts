import { IsMongoId } from 'class-validator';

export class FindUserDto {
  @IsMongoId({ message: 'Invalid user id' })
  id: string;
}
