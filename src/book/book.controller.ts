import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService) {}

    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
        return this.bookService.findAll(query);
    }

    @Post()
    @UseGuards(AuthGuard())
    async createBook(@Body() book: CreateBookDto, @Req() req): Promise<Book> {
        return this.bookService.create(book, req.user);
    }

    @Get('author') // Rota para buscar por autor
    async findByAuthor(@Query('name') name: string): Promise<Book[]> {
        return this.bookService.findByAuthor(name);
    }

    @Get('genre') // Rota para buscar por gênero
    async findByGenre(@Query('name') name: string): Promise<Book[]> {
        return this.bookService.findByGenre(name);
    }

    // Mantenha as rotas por ID por último
    @Get(':id') // Rota para buscar por ID
    async getBook(@Param('id') id: string): Promise<Book> {
        return this.bookService.findById(id);
    }

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() book: UpdateBookDto): Promise<Book> {
        return this.bookService.updateById(id, book);
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string): Promise<Book> {
        return this.bookService.deleteById(id);
    }
}
