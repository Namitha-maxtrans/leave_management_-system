import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LeaveBalance } from './entities/leave_balance.entity';
import { CreateLeaveBalanceDto } from './dto/create-leave_balance.dto';


@Injectable()
export class LeaveBalancesService {
  constructor(
    @InjectRepository(LeaveBalance)
    private readonly leaveBalanceRepository: Repository<LeaveBalance>,
  ) {}

  // 1. Create leave balance
  async create(
    data: CreateLeaveBalanceDto,
  ): Promise<LeaveBalance> {
    const existingBalance =
      await this.leaveBalanceRepository.findOne({
        where: {
          employee_id: data.employee_id,
          leave_type_id: data.leave_type_id,
        },
      });

    if (existingBalance) {
      throw new ConflictException(
        'Leave balance already exists for this employee and leave type',
      );
    }

    const leaveBalance =
      this.leaveBalanceRepository.create({
        employee_id: data.employee_id,
        leave_type_id: data.leave_type_id,
        allocated: data.allocated,
        used: 0,
      });

    return await this.leaveBalanceRepository.save(
      leaveBalance,
    );
  }

  // 2. Get all leave balances
  async getAllBalances() {
    const balances =
      await this.leaveBalanceRepository.find({
        relations: {
          employee: true,
          leaveType: true,
        },
      });

    return balances.map((balance) => ({
      ...balance,
      remaining: balance.allocated - balance.used,
    }));
  }

  // 3. Get balances by employee ID
  async getBalanceByEmployee(employeeId: number) {
    const balances =
      await this.leaveBalanceRepository.find({
        where: {
          employee_id: employeeId,
        },
        relations: {
          employee: true,
          leaveType: true,
        },
      });

    return balances.map((balance) => ({
      ...balance,
      remaining: balance.allocated - balance.used,
    }));
  }
  //delete leave balance
  async deleteByEmployeeId(employeeId: number) {
    await this.leaveBalanceRepository.delete({
      employee_id: employeeId,
     
    });

    return {
      message: 'Leave balances deleted successfully',
    };
  }
}