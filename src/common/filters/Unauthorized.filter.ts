import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';

import { globalOpcode } from '../opcode';

@Catch(UnauthorizedException)
export class UnauthorizedFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const body = globalOpcode.NotFound().getResponse();
    host.switchToHttp().getResponse().status(401).json(body);
  }
}
