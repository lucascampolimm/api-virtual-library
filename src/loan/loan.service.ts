import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './schemas/loan.schema';
import { BookService } from '../book/book.service';

@Injectable()
export class LoanService {
    constructor(
        @InjectModel('Loan') private readonly loanModel: Model<Loan>,
        private readonly bookService: BookService,
    ) {}

    async createLoan(createLoanDto: CreateLoanDto): Promise<Loan> {
        // Verifique se o livro existe antes de criar o empréstimo
        const bookExists = await this.bookService.bookExists(createLoanDto.book);

        if (!bookExists) {
            throw new NotFoundException(`Livro com ID '${createLoanDto.book}' não encontrado`);
        }

        // Verifique se o livro já está emprestado
        const isBookAlreadyLoaned = await this.isBookAlreadyLoaned(createLoanDto.book);

        if (isBookAlreadyLoaned) {
            throw new BadRequestException('Livro já emprestado.');
        }

        const createdLoan = new this.loanModel(createLoanDto);
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

    async returnLoan(id: string): Promise<Loan> {
        const loan = await this.getLoanById(id);
        loan.returned = true;
        await loan.save();
        return loan;
    }

    async isBookAlreadyLoaned(bookId: string): Promise<boolean> {
        const existingLoan = await this.loanModel.findOne({ book: bookId, returned: false }).exec();
        return !!existingLoan;
    }
}
