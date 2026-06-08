import { Injectable, ConflictException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { SwipeProfileDto } from './dto/swipe-profile.dto'

@Injectable()
export class SwipesService {
  constructor(private prisma: PrismaService) {}

  async swipeProfile(founderId: string, { developerId, direction }: SwipeProfileDto) {

    
    //check if founder already swiped this developer
    const existingSwipe = await this.prisma.profileSwipe.findUnique({
      where: {
        founderId_developerId: { founderId, developerId }
      }
    })

    if (existingSwipe) {
      throw new ConflictException('Already swiped this profile')
    }

   
    //Make a swipe from founder to developer
    const swipe = await this.prisma.profileSwipe.create({
      data: {
        founderId,
        developerId,
        direction,
        status: direction === 'LIKE' ? 'PENDING' : undefined,
      }
    })

    //Make the match and update the status of the swipe to ACCEPTED
    if (direction === 'LIKE') {
      await this.checkAndCreateMatch(founderId, developerId)
    }

    return swipe
  }

  private async checkAndCreateMatch(founderId: string, developerId: string) {

   
    //check if the developer has liked a mission of the founder
    const missionSwipe = await this.prisma.missionSwipe.findFirst({
      where: {
        developerId,
        direction: 'LIKE',
        status: 'PENDING',
        mission: { founderId }
      },
      include: { mission: true }
    })

   
    if (missionSwipe) {
      await this.prisma.match.create({
        data: {
          developerId,
          founderId,
          missionId: missionSwipe.missionId,
        }
      })

      //Update the status of the mission swipe to ACCEPTED
      await this.prisma.missionSwipe.update({
        where: { id: missionSwipe.id },
        data: { status: 'ACCEPTED' }
      })

      await this.prisma.profileSwipe.update({
        where: { founderId_developerId: { founderId, developerId } },
        data: { status: 'ACCEPTED' }
      })
    }
  }
}