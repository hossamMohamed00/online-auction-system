	import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hash } from 'bcryptjs';
import { Role } from '../enums';

export type UserDocument = User & Document;

@Schema({ discriminatorKey: 'kind' })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ unique: true, required: true, trim: true })
  email: string;

  @Prop({ required: true, min: 3 })
  password: string;

  @Prop({ required: false })
  refreshToken: string;

  @Prop({ enum: Object.values(Role), default: Role.Buyer })
  role: Role;
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
