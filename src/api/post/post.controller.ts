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
import { CreatePostDto, ManagePostDto } from 'src/common/dto';
import { PostService } from './post.service';
import { PostGuard } from 'src/common/guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPost(): Promise<PostDocument[]> {
    return this.postService.getAllPost();
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

  @Get('/:id')
  getPost(@Param('id') id: string): Promise<PostDocument> {
    return this.postService.getPostById(id);
  }

  @Delete('/:id')
  @UseGuards(PostGuard)
  removePost(@Param('id') id: string): Promise<boolean> {
    return this.postService.removePost(id);
  }

  @Patch('/:id')
  @UseGuards(PostGuard)
  managePost(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() data: ManagePostDto,
  ): Promise<PostDocument> {
    return this.postService.managePost(data, request.post);
  }
}
