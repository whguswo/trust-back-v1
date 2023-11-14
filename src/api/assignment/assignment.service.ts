import { Body, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssignmentDto } from 'src/common/dto';
import {
  Assignment,
  AssignmentDocument,
} from 'src/common/schemas';
import { UserService } from '../user/user.service';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name)
    private assignmentModel: Model<AssignmentDocument>,

    private userService: UserService,
  ) {}

  async getAllAssignment(): Promise<AssignmentDocument[]> {
    const assigns = await this.assignmentModel.find();

    return assigns;
  }

  async createAssignment(
    @Body() data: CreateAssignmentDto,
  ): Promise<AssignmentDocument> {
    const user = await this.userService.getUserById(data.user);
    if (!user) throw new HttpException('사용자를 찾을수 없습니다.', 404);
    const assignment = new this.assignmentModel({
      user: user._id,
      title: data.title,
      content: data.content,
      month: data.month,
      week: data.week,
      category: data.category,
      completed: false,
    });

    await assignment.save();

    return assignment;
  }
}
