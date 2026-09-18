import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaveRequestDto } from './create-leave_request.dto';

export class UpdateLeaveRequestDto extends PartialType(CreateLeaveRequestDto) {}
