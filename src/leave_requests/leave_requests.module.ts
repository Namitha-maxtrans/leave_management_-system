import { Module } from '@nestjs/common';
import { LeaveRequestsService } from './leave_requests.service';
import { LeaveRequestsController } from './leave_requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequest } from './entities/leave_request.entity';
import { Emp } from '../employee/employee.entity';
import { LeaveType } from '../leave_type/leave.entity';
import { LeaveBalance } from '../leave_balances/entities/leave_balance.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LeaveRequest,Emp,LeaveType,LeaveBalance])],
  controllers: [LeaveRequestsController],
  providers: [LeaveRequestsService],
})
export class LeaveRequestsModule {}
