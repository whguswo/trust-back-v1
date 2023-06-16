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
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Post as PostSchema } from 'src/models/post.schema';
import { CreatePostDto } from './dto/createPost.dto';
import { PostService } from './post.service';

@Controller('/api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/id/:id')
  getPost(@Param('id') id: string): Promise<PostSchema> {
    return this.postService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(
    @Req() request: Request,
    @Body() data: CreatePostDto,
  ): Promise<PostSchema> {
    return this.postService.createPost(data, request.user);
  }

  @ApiBearerAuth('userToken')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removePost(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<boolean> {
    return this.postService.removePost(id, request.user);
  }

  @ApiBearerAuth('userToken')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  modifyPost(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() data: CreatePostDto,
  ): Promise<PostSchema> {
    return this.postService.modifyPost(data, id, request.user);
  }
}
