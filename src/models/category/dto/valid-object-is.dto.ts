import { IsMongoId } from 'class-validator';

/*
 * This is to ensure that the id is a valid mongo id.
 */
export class ObjectIdDto {
  @IsMongoId({ message: 'Invalid idss ❌' })
  id: string;
}
