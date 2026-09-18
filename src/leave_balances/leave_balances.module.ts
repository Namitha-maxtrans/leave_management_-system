import { Module } from '@nestjs/common';
import { LeaveBalancesService } from './leave_balances.service';
import { LeaveBalancesController } from './leave_balances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveBalance } from './entities/leave_balance.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LeaveBalance])],
  controllers: [LeaveBalancesController],
  providers: [LeaveBalancesService],
   exports: [LeaveBalancesService],
})
export class LeaveBalancesModule {}
