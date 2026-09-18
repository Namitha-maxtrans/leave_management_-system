import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch
} from '@nestjs/common';

import { LeaveRequestsService } from './leave_requests.service';

import { CreateLeaveRequestDto } from './dto/create-leave_request.dto';

@Controller('leave-requests')
export class LeaveRequestsController {
  constructor(
    private readonly leaveRequestsService: LeaveRequestsService,
  ) {}

  // Create a leave request
  @Post()
  createLeaveRequest(
    @Body() data: CreateLeaveRequestDto,
  ) {
    return this.leaveRequestsService.createLeaveRequest(
      data,
    );
  }

  // Get all leave requests
  @Get()
  getAllRequests() {
    return this.leaveRequestsService.getAllRequests();
  }

  // Get leave request by ID
  @Get(':id')
  getRequestById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.leaveRequestsService.getRequestById(
      id,
    );
  }
  // Approve leave request
@Patch(':id/approve')
approveRequest(
  @Param('id', ParseIntPipe) id: number,
) {
  return this.leaveRequestsService.approveRequest(id);
}

// Reject leave request
@Patch(':id/reject')
rejectRequest(
  @Param('id', ParseIntPipe) id: number,
) {
  return this.leaveRequestsService.rejectRequest(id);
}

// Cancel leave request
@Patch(':id/cancel')
cancelRequest(
  @Param('id', ParseIntPipe) id: number,
) {
  return this.leaveRequestsService.cancelRequest(id);
}
}