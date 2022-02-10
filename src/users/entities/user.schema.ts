import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hash } from 'bcryptjs';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  email: string;

  @Prop({ required: true, min: 3 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

/*
 ? Add pre save hook to hash user password
 */
UserSchema.pre<UserDocument>('save', async function (next) {
  const user: UserDocument = this;
  //* check the password if it is modified
  if (!user.isModified('password')) {
    return next();
  }

  //* Hashing the password
  user.password = await hash(user.password, 12);
  next();
});
