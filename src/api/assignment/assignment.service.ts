// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import {
//   Assignment,
//   AssignmentDocument,
// } from 'src/common/schemas';

// @Injectable()
// export class AssignmentService {
//   constructor(
//     @InjectModel(Assignment.name)
//     private assignmentModel: Model<AssignmentDocument>,
//   ) {}

//   async getAssignment(): Promise<AssignmentDocument[]> {
//     const assigns = await this.assignmentModel.find();

//     return assigns;
//   }

// }
