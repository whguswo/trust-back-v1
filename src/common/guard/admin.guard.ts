import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (req.user.role !== "ADMIN") throw new HttpException("ADMIN만 접근 가능한 라우터 입니다.", 404);

    return true;
  }
}
