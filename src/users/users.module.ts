import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users } from './models/users.model';

@Module({
  imports: [MongooseModule.forFeature([{name: Users.modelName, schema: Users.model.schema}])], 
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
