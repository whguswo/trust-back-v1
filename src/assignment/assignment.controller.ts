import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AssignmentDto, AssignmentStatus } from './dto/assignment.dto';
import { Assignment } from '../models';
import { Request } from 'express';
import { AssignmentService } from './assignment.service';

@Controller('api/assign')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllAsignment(
    @Req() request: Request,
    @Body() data: any,
  ): Promise<Assignment[]> {
    if (request.user.role !== 'ADMIN') throw new UnauthorizedException();
    return this.assignmentService.getAllAssignByUser(data.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  getMyAssignment(@Req() request: Request): Promise<Assignment[]> {
    return this.assignmentService.getAllAssignByUser(request.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createAssignment(
    @Req() request: Request,
    @Body() data: AssignmentDto,
  ): Promise<Assignment> {
    if (request.user.role !== 'ADMIN') throw new UnauthorizedException();
    return this.assignmentService.createAssignment(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  editAssignmentStatus(
    @Req() request: Request,
    @Body() data: AssignmentStatus,
  ): Promise<Assignment> {
    if (!request.user) throw new UnauthorizedException();
    return this.assignmentService.editAssignmentStatus(data, request.user);
  }
}
