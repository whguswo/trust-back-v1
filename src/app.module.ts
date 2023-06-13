import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AssignmentModule } from './assignment/assignment.module';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from './post/post.module';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

ConfigModule.forRoot();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@tust-web.goaab89.mongodb.net/trust-web`,
    ),
    UserModule,
    AuthModule,
    JwtModule,
    AssignmentModule,
    PostModule,
  ],
  controllers: [ApiController],
  providers: [
    ApiService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
