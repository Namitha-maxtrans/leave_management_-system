import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { LeaveBalancesService } from './leave_balances.service';
import { CreateLeaveBalanceDto } from './dto/create-leave_balance.dto';


@Controller('leave-balances')
export class LeaveBalancesController {
  constructor(
    private readonly leaveBalancesService: LeaveBalancesService,
  ) {}

  // 1. Create leave balance
  @Post()
  create(@Body() data: CreateLeaveBalanceDto) {
    return this.leaveBalancesService.create(data);
  }

  // 2. Get all balances
  @Get()
  getAllBalances() {
    return this.leaveBalancesService.getAllBalances();
  }

  // 3. Get balance by employee ID
  @Get('employee/:employeeId')
  getBalanceByEmployee(
    @Param('employeeId', ParseIntPipe)
    employeeId: number,
  ) {
    return this.leaveBalancesService.getBalanceByEmployee(
      employeeId,
    );
  }
}