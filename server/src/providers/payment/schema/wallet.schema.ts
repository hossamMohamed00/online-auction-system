import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
	@Prop({ required: true, trim: true, lowercase: true })
	balance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
