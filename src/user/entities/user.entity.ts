import { Assginment } from './assignment.entity';

export class User {
  username: string;
  password: string;
  role: string;
  assignments: Assginment[];
}
