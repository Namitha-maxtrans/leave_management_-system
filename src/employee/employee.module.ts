import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emp } from './employee.entity';
import { LeaveBalancesModule } from '../leave_balances/leave_balances.module';
import { LeaveTypeModule } from '../leave_type/leave_type.module';

@Module({
   imports: [TypeOrmModule.forFeature([Emp]),
   LeaveTypeModule,
    LeaveBalancesModule,],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
