import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Assignment, AssignmentDocument, User } from '../models';
import { AssignmentDto, AssignmentStatus } from './dto/assignment.dto';
import { Types } from 'mongoose';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name)
    private assignmentModel: Model<AssignmentDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async getAllAssignByUser(username: string): Promise<Assignment[]> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) throw new HttpException('No exist user', 404);

    const result = await this.assignmentModel.find({ user: user._id });
    return result;
  }

  async getAllAssignByUserId(id: string): Promise<Assignment[]> {
    const result = await this.assignmentModel.find({
      user: new Types.ObjectId(id),
    });
    return result;
  }

  async createAssignment(data: AssignmentDto): Promise<Assignment> {
    const user = await this.userService.getUserByUsername(data.username);
    if (!user) throw new HttpException('No exist user', 404);

    delete data.username;
    const assign = new this.assignmentModel({
      ...data,
      user: user._id,
      completed: false,
    });

    await assign.save();
    return assign;
  }

  async getAssignmentByObjectId(objectId: string): Promise<Assignment> {
    const assignment = await this.assignmentModel.findById(
      new Types.ObjectId(objectId),
    );
    if (!assignment) throw new HttpException('No exist assignment', 404);

    return assignment;
  }

  async editAssignmentStatus(
    data: AssignmentStatus,
    user: User,
  ): Promise<Assignment> {
    const assignment = await this.assignmentModel.findById(
      new Types.ObjectId(data.assignId),
    );
    if (!assignment) throw new HttpException('No exist assignment', 404);
    if (
      assignment.user.toString() != user._id.toString() &&
      user.role != 'ADMIN'
    )
      throw new HttpException('Not assignment user', 404);

    assignment.completed = data.status;
    assignment.save();

    return assignment;
  }
}
