import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { LeaveRequestStatus } from "./leave_requeststatus";
import { CreateLeaveRequestDto } from "./dto/create-leave_request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Emp } from "../employee/employee.entity";
import { LeaveBalance } from "../leave_balances/entities/leave_balance.entity";
import { LeaveType } from "../leave_type/leave.entity";
import { LeaveRequest } from "./entities/leave_request.entity";

@Injectable()
export class LeaveRequestsService {
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRequestRepository:
      Repository<LeaveRequest>,

    @InjectRepository(Emp)
    private readonly employeeRepository:
      Repository<Emp>,

    @InjectRepository(LeaveType)
    private readonly leaveTypeRepository:
      Repository<LeaveType>,

    @InjectRepository(LeaveBalance)
    private readonly leaveBalanceRepository:
      Repository<LeaveBalance>,
  ) {}

  private calculateDays(
    startDate: string,
    endDate: string,
  ): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const difference =
      end.getTime() - start.getTime();

    return (
      difference / (1000 * 60 * 60 * 24)
    ) + 1;
  }

  async createLeaveRequest(
    data: CreateLeaveRequestDto,
  ) {
    const employee =
      await this.employeeRepository.findOne({
        where: {
          id: data.employee_id,
        },
      });

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    const leaveType =
      await this.leaveTypeRepository.findOne({
        where: {
          id: data.leave_type_id,
        },
      });

    if (!leaveType) {
      throw new NotFoundException(
        'Leave type not found',
      );
    }

    if (data.end_date < data.start_date) {
      throw new BadRequestException(
        'End date cannot be before start date',
      );
    }

    const daysCount = this.calculateDays(
      data.start_date,
      data.end_date,
    );

    const leaveRequest =
      this.leaveRequestRepository.create({
        ...data,
        days_count: daysCount,
        status: LeaveRequestStatus.PENDING,
      });

    return await this.leaveRequestRepository.save(
      leaveRequest,
    );
  }

  async getAllRequests() {
    return await this.leaveRequestRepository.find({
      relations: {
        employee: true,
        leaveType: true,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  async getRequestById(id: number) {
    const leaveRequest =
      await this.leaveRequestRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          employee: true,
          leaveType: true,
        },
      });

    if (!leaveRequest) {
      throw new NotFoundException(
        'Leave request not found',
      );
    }

    return leaveRequest;
  }
//Approve leave request
  async approveRequest(id: number) {
  // Find leave request
  const request = await this.leaveRequestRepository.findOne({
    where: { id },
  });

  if (!request) {
    throw new NotFoundException(
      'Leave request not found',
    );
  }

  // Only pending requests can be approved
  if (request.status !== LeaveRequestStatus.PENDING) {
    throw new BadRequestException(
      'Only pending requests can be approved',
    );
  }

  // Find leave balance
  const balance = await this.leaveBalanceRepository.findOne({
    where: {
      employee_id: request.employee_id,
      leave_type_id: request.leave_type_id,
    },
  });

  if (!balance) {
    throw new NotFoundException(
      'Leave balance not found',
    );
  }

  // Calculate remaining leaves
  const remaining =
    balance.allocated - balance.used;

  // Check available leaves
  if (remaining < request.days_count) {
    throw new BadRequestException(
      'Insufficient leave balance',
    );
  }

  // Update used leaves
  balance.used =
    balance.used + request.days_count;

  request.status = LeaveRequestStatus.APPROVED;

  await this.leaveBalanceRepository.save(balance);

  return await this.leaveRequestRepository.save(request);
}
//rejectrequest
async rejectRequest(id: number) {
  const request = await this.leaveRequestRepository.findOne({
    where: { id },
  });

  if (!request) {
    throw new NotFoundException(
      'Leave request not found',
    );
  }

  if (request.status !== LeaveRequestStatus.PENDING) {
    throw new BadRequestException(
      'Only pending requests can be rejected',
    );
  }

  request.status = LeaveRequestStatus.REJECTED;

  return await this.leaveRequestRepository.save(request);
}

async cancelRequest(id: number) {
  const request = await this.leaveRequestRepository.findOne({
    where: { id },
  });

  if (!request) {
    throw new NotFoundException(
      'Leave request not found',
    );
  }

  if (
    request.status !== LeaveRequestStatus.PENDING &&
    request.status !== LeaveRequestStatus.APPROVED
  ) {
    throw new BadRequestException(
      'Only pending or approved requests can be cancelled',
    );
  }

  // If approved, restore the leave balance
  if (request.status === LeaveRequestStatus.APPROVED) {
    const balance =
      await this.leaveBalanceRepository.findOne({
        where: {
          employee_id: request.employee_id,
          leave_type_id: request.leave_type_id,
        },
      });

    if (balance) {
      balance.used = Math.max(
        0,
        balance.used - request.days_count,
      );

      await this.leaveBalanceRepository.save(balance);
    }
  }

  request.status = LeaveRequestStatus.CANCELLED;

  return await this.leaveRequestRepository.save(request);
}
}