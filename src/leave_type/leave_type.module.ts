import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveTypeController } from './leave_type.controller';
import { LeaveTypeService } from './leave_type.service';
import { LeaveType } from './leave.entity';

@Module({
    imports: [TypeOrmModule.forFeature([LeaveType])],
    controllers:[LeaveTypeController],
    providers:[LeaveTypeService],
    exports: [LeaveTypeService],

})
export class LeaveTypeModule {}
