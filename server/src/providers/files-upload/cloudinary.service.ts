import { Injectable, Logger } from '@nestjs/common';
import toStream = require('buffer-to-stream');
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
	private logger: Logger = new Logger('CloudinaryService');

	/**
	 * Upload new image to cloudinary
	 * @param file
	 * @returns Promise with the response or error
	 */
	async uploadImage(
		file: Express.Multer.File,
	): Promise<UploadApiResponse | UploadApiErrorResponse> {
		//* Try to upload the file and resolve the response if success or reject in case of error
		return new Promise((resolve, reject) => {
			//* Upload the file to cloudinary
			const upload = v2.uploader.upload_stream((error, result) => {
				if (error) {
					this.logger.warn('Image upload failed 😪');
					return reject(error);
				}

				this.logger.log(
					'Image upload success 😃, with public_id: ' + result.public_id,
				);
				resolve(result);
			});

			//? convert the file from buffer to a readable stream
			toStream(file.buffer).pipe(upload);
		});
	}
}
