import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { PostDocument } from 'src/common/schemas';
import { CreatePostDto } from 'src/common/dto';
import { PostService } from './post.service';
import { PostGuard } from 'src/common/guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/id/:id')
  getPost(@Param('id') id: string): Promise<PostDocument> {
    return this.postService.getPostById(id);
  }

  @Get('/my')
  getMyPost(@Req() request: Request): Promise<PostDocument[]> {
    return this.postService.getMyPost(request.user);
  }

  @Post()
  createPost(
    @Req() request: Request,
    @Body() data: CreatePostDto,
  ): Promise<PostDocument> {
    return this.postService.createPost(data, request.user);
  }

  @Delete('/:id')
  @UseGuards(PostGuard)
  removePost(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<boolean> {
    return this.postService.removePost(id);
  }

  @Patch('/:id')
  @UseGuards(PostGuard)
  modifyPost(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() data: CreatePostDto,
  ): Promise<PostDocument> {
    return this.postService.modifyPost(data, request.post);
  }
}
