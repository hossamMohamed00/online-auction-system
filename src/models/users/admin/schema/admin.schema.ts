import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop({ required: true, default: true })
  isAdmin: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
