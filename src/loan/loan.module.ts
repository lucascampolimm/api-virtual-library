import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { LoanSchema } from './schemas/loan.schema';
import { BookModule } from '../book/book.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Loan', schema: LoanSchema }]), BookModule, AuthModule, LoanModule],
    controllers: [LoanController],
    providers: [LoanService],
})
export class LoanModule {}
