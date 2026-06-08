import { IsEnum, IsString } from 'class-validator'

export class SwipeProfileDto {
  @IsString()
  developerId!: string

  @IsEnum(['LIKE', 'DISLIKE'])
  direction!: 'LIKE' | 'DISLIKE'
}