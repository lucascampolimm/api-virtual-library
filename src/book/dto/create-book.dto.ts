import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../schemas/book.schema';
import { User } from '../../auth/schemas/user.schema';

export class CreateBookDto {
    @IsNotEmpty({ message: 'O título não pode estar vazio' })
    @IsString({ message: 'Título está esperando uma string' })
    readonly title: string;

    @IsNotEmpty({ message: 'A descrição não pode estar vazia' })
    @IsString({ message: 'Descrição está esperando uma string' })
    readonly description: string;

    @IsNotEmpty({ message: 'O autor não pode estar vazio' })
    @IsString({ message: 'Autor está esperando uma string' })
    readonly author: string;

    @IsNotEmpty({ message: 'O preço não pode estar vazio' })
    @IsNumber({}, { message: 'Preço está esperando um number' })
    readonly price: number;

    @IsNotEmpty({ message: 'A categoria não pode estar vazia' })
    @IsEnum(Category, { message: 'Insira uma categoria válida' })
    readonly category: Category;

    @IsEmpty({ message: 'Você não pode passsar o ID do usuário' })
    readonly user: User;
}
