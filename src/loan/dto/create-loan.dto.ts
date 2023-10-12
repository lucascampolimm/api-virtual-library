import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateLoanDto {
    @IsNotEmpty({ message: 'O campo book é obrigatório' })
    readonly book: string;

    @IsNotEmpty({ message: 'O campo user é obrigatório' })
    readonly user: string;

    @IsDateString({}, { message: 'A data do empréstimo deve estar em formato de data válida' })
    readonly loanDate: string;

    @IsDateString({}, { message: 'A data de devolução deve estar em formato de data válida' })
    readonly dueDate: string;
}
