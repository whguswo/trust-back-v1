import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  apiTest(): string {
    return 'API connect test';
  }
}
