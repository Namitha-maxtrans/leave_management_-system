import { Test, TestingModule } from '@nestjs/testing';
import { LeaveRequestsController } from './leave_requests.controller';
import { LeaveRequestsService } from './leave_requests.service';

describe('LeaveRequestsController', () => {
  let controller: LeaveRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveRequestsController],
      providers: [LeaveRequestsService],
    }).compile();

    controller = module.get<LeaveRequestsController>(LeaveRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
