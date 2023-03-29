import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
ConfigModule.forRoot();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@tust-web.goaab89.mongodb.net/trust-web`,
    ),
    UserModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class AppModule {}
