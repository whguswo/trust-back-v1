import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateAssignmentDto } from 'src/common/dto';
import { AssignmentDocument, PostDocument } from 'src/common/schemas';
import { AssignmentService } from './assignment.service';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  getAllAssignment(): Promise<AssignmentDocument[]> {
    return this.assignmentService.getAllAssignment();
  }

  @Post()
  createAssignment(@Body() data: CreateAssignmentDto): Promise<AssignmentDocument> {
    return this.assignmentService.createAssignment(data);
  }
}
