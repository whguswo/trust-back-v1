import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  apiTest(): string {
    return 'API connect test';
  }
}
