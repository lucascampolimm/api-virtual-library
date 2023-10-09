import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './schemas/loan.schema';

@Injectable()
export class LoanService {
    constructor(@InjectModel('Loan') private readonly loanModel: Model<Loan>) {}

    async createLoan(createLoanDto: CreateLoanDto): Promise<Loan> {
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
}
