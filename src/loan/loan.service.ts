import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './schemas/loan.schema';
import { BookService } from '../book/book.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LoanService {
    constructor(
        @InjectModel('Loan') private readonly loanModel: Model<Loan>,
        private readonly bookService: BookService,
        private readonly authService: AuthService,
    ) {}

    async createLoan(createLoanDto: CreateLoanDto): Promise<Loan> {
        const { book: bookId, user: userId } = createLoanDto;

        // Verifique se o livro existe antes de criar o empréstimo
        const bookExists = await this.bookService.bookExists(bookId);
        const userExists = await this.authService.userExists(userId);

        if (!bookExists) {
            throw new NotFoundException(`Livro com ID '${bookId}' não encontrado`);
        }
        if (!userExists) {
            throw new NotFoundException(`Usuário com ID '${userId}' não encontrado`);
        }

        // Verifique se o livro já está emprestado
        const isBookAlreadyLoaned = await this.isBookAlreadyLoaned(bookId);

        if (isBookAlreadyLoaned) {
            throw new BadRequestException('Livro já emprestado.');
        }

        // Agora, crie o empréstimo associando-o ao usuário
        const createdLoan = new this.loanModel({
            ...createLoanDto,
            user: userId, // Associe o empréstimo ao usuário correto
        });
        return createdLoan.save();
    }

    async getLoanById(id: string): Promise<Loan> {
        const loan = await this.loanModel.findById(id).exec();
        if (!loan) {
            throw new NotFoundException('Empréstimo não encontrado');
        }
        return loan;
    }

    async getAllLoans(): Promise<Loan[]> {
        return this.loanModel.find().exec();
    }

    async returnLoan(id: string): Promise<void> {
        const loan = await this.getLoanById(id);
        loan.returned = true;
        await loan.save();

        // Remova o empréstimo do banco de dados
        await this.loanModel.deleteOne({ _id: id });
    }

    async isBookAlreadyLoaned(bookId: string): Promise<boolean> {
        const existingLoan = await this.loanModel.findOne({ book: bookId, returned: false }).exec();
        return !!existingLoan;
    }
}
