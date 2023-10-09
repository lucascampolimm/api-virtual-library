import { Schema, Document } from 'mongoose';

export interface Loan extends Document {
    book: string; // ou mongoose.Schema.Types.ObjectId, se o livro também for um documento do Mongoose
    user: string; // ou mongoose.Schema.Types.ObjectId, se o usuário também for um documento do Mongoose
    loanDate: Date;
    dueDate: Date;
    returned: boolean;
    // Outros campos de empréstimo, se necessário
}

export const LoanSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    loanDate: { type: Date, default: Date.now, required: true },
    dueDate: { type: Date, required: true },
    returned: { type: Boolean, default: false },
    // Outros campos de empréstimo, se necessário
});
