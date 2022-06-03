import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { ResponseResult } from 'src/common/types';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { UserUpdateDto } from '../../shared-user/dto/update-user.dto';
import { Buyer } from '../schema/buyer.schema';

export interface BuyerProfileBehaviors {
	//* Get buyer profile
	getProfile({ id: buyerId }: MongoObjectIdDto): Promise<Buyer>;

	//* Edit buyer profile
	editProfile(
		userUpdateDto: UserUpdateDto,
		buyerId: string,
	): Promise<ResponseResult>;
}
