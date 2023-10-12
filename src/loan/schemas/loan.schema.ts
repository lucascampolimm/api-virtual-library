import { Schema, Document } from 'mongoose';

export interface Loan extends Document {
    book: string;
    user: string;
    loanDate: Date;
    dueDate: Date;
    returned: boolean;
}

export const LoanSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    loanDate: { type: Date, default: Date.now, required: true },
    dueDate: { type: Date, required: true },
    returned: { type: Boolean, default: false },
});
