import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common'
import { SwipesService } from './swipes.service'
import { SwipeProfileDto } from './dto/swipe-profile.dto'
import { JwtAuthGuard } from '../auth/jwt.guard'

@Controller('swipes')
@UseGuards(JwtAuthGuard)
export class SwipesController {
  constructor(private readonly swipesService: SwipesService) {}

  @Post('profile')
  swipeProfile(@Req() req, @Body() swipeProfileDto: SwipeProfileDto) {
    return this.swipesService.swipeProfile(req.user.id, swipeProfileDto)
  }
}