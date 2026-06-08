import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController], // controller of serivce 
  providers: [UsersService], // list of dependance injected in service
  exports: [UsersService], // export service
})
export class UsersModule {}
