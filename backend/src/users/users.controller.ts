import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('users')
@UseGuards(JwtAuthGuard) // all routes are protected
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //get all developers
  @Get("developers")
  findAllDevelopers(@Req() req){
    return this.usersService.findAllDevelopers(req.user.id)
  }

  //get a developer
  @Get("developers/:id")
  findOne(@Param("id") id:string){
    return this.usersService.findOne(id)
  }


  //update developer profil 
  @Patch("me")
  update(@Req() req, @Body() UpdateUserDto: UpdateUserDto){
    return this.usersService.update(req.user.id, UpdateUserDto)
  }
}


