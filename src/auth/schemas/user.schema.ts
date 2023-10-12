import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({
    timestamps: true,
})
export class User extends Document {
    @Prop()
    name: string;

    @Prop({ unique: [true, 'E-mail duplicado inserido'] })
    email: string;

    @Prop()
    password: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }] })
    loans: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
