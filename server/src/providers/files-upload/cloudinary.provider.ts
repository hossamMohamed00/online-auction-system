import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
	provide: CLOUDINARY,
	useFactory: () => {
		//TODO: Create new config module to cloudinary environment variables
		return v2.config({
			cloud_name: 'auctions-files',
			api_key: '231756796911788',
			api_secret: '95bqmL6R-QizYGnfXXe0VQ2UFIo',
		});
	},
};
