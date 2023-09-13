import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostService } from 'src/api/post/post.service';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(private readonly postService: PostService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const postId = req.url.split('/')[2];
    const post = await this.postService.getPostById(postId);

    if (req.user.role !== "ADMIN" && !post.user.equals(req.user._id))
      throw new HttpException("해당 작업을 수행할 권한이 없습니다.", 403);

    req.post = post;

    return true;
  }
}
