import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>,
    ) {}

    async findAll(query: Query): Promise<Book[]> {
        // console.log(query);

        // Limite de 2 livros por página.
        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        // Filtrar por autor.
        const keyword = query.keyword
            ? {
                  author: {
                      $regex: query.keyword,
                      $options: 'i',
                  },
              }
            : {};

        const books = await this.bookModel
            .find({ ...keyword })
            .limit(resPerPage)
            .skip(skip);
        return books;
    }

    async create(book: Book): Promise<Book> {
        const res = await this.bookModel.create(book);
        return res;
    }

    async findById(id: string): Promise<Book> {
        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('ID inválido');
        }

        const isFoundBook = await this.bookModel.findById(id);

        if (!isFoundBook) {
            throw new NotFoundException('Livro não encontrado');
        }

        return isFoundBook;
    }

    async updateById(id: string, book: Book): Promise<Book> {
        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('ID inválido');
        }

        const isFoundBook = await this.bookModel.findById(id);

        if (!isFoundBook) {
            throw new NotFoundException('Livro não encontrado');
        }

        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Book> {
        const isValidId = mongoose.isValidObjectId(id);

        if (!isValidId) {
            throw new BadRequestException('ID inválido');
        }

        const isFoundBook = await this.bookModel.findById(id);

        if (!isFoundBook) {
            throw new NotFoundException('Livro não encontrado');
        }

        return await this.bookModel.findByIdAndDelete(id);
    }
}
