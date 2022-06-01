import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { hash } from 'bcryptjs';
import { Role } from '../enums';
import { Transform } from 'class-transformer';
import { ImageType } from 'src/models/items/schema/image.type';

export type UserDocument = User & Document;

@Schema({ discriminatorKey: 'kind' })
export class User {
	@Transform(({ value }) => value.toString())
	_id: ObjectId;

	@Prop({ required: true, trim: true })
	name: string;

	@Prop({ unique: true, required: true, trim: true })
	email: string;

	@Prop({ default: false })
	isEmailConfirmed: boolean;

	@Prop({ default: null })
	emailVerificationCode: number;

	@Prop({ required: true, min: 3 })
	password: string;

	@Prop({ required: false })
	refreshToken: string;

	@Prop({ enum: Object.values(Role), default: Role.Buyer })
	role: Role;

	@Prop({ default: false })
	isBlocked: boolean;

	@Prop({ default: null, trim: true })
	blockReason: string;

	@Prop({ default: false })
	isWarned: boolean;

	@Prop({ default: null, trim: true })
	warningMessage: string;

	@Prop()
	image: ImageType;
	@Prop()
	nationalID: Number;

	@Prop()
	phoneNumber: Number;

	@Prop()
	address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

/*
 ? Add pre save hook to hash user password
 */
UserSchema.pre<UserDocument>('save', async function (next) {
	//* check the password if it is modified
	if (!this.isModified('password')) {
		return next();
	}

	//* Hashing the password
	this.password = await hash(this.password, 12);
	next();
});
