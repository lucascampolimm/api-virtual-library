import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './schemas/loan.schema';

@Controller('loan')
export class LoanController {
    constructor(private readonly loanService: LoanService) {}

    @Post()
    async createLoan(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
        return this.loanService.createLoan(createLoanDto);
    }

    @Get(':id')
    async getLoanById(@Param('id') id: string): Promise<Loan> {
        return this.loanService.getLoanById(id);
    }

    @Get()
    async getAllLoans(): Promise<Loan[]> {
        return this.loanService.getAllLoans();
    }

    @Put(':id/return')
    async returnLoan(@Param('id') id: string): Promise<{ message: string }> {
        const loan = await this.loanService.returnLoan(id);

        if (loan !== null) {
            return { message: 'Livro devolvido com sucesso' };
        } else {
            return { message: 'Empréstimo não encontrado' };
        }
    }
}
