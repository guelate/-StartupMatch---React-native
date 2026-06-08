import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MissionsModule } from './missions/missions.module';
import { SwipesModule } from './swipes/swipes.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  
    PrismaModule,
    AuthModule,
    UsersModule,
    MissionsModule,
    SwipesModule,
    MatchesModule,
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}