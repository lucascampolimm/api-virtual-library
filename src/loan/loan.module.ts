import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { LoanSchema } from './schemas/loan.schema'; // Importe o esquema corretamente
import { BookModule } from 'src/book/book.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Loan', schema: LoanSchema }]),
        BookModule,
        AuthModule, // Use o nome do modelo como uma string
    ],
    controllers: [LoanController],
    providers: [LoanService],
})
export class LoanModule {}
