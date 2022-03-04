import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

/**
 * This schema contains only properties that is specific to the Admin,
 *  as the rest of properties will be inherited from the shared-user
 */

@Schema()
export class Admin {
	@Prop({ required: true, default: true })
	isAdmin: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
