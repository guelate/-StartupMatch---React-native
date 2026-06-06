export interface Match {
    id: string
    developerId: string
    founderId: string
    missionId: string
    createdAt: string
  }
  
  export interface MissionSwipe {
    id: string
    developerId: string
    missionId: string
    direction: 'LIKE' | 'DISLIKE'
    status?: 'PENDING' | 'ACCEPTED' | 'REJECTED'
    createdAt: string
  }
  
  export interface ProfileSwipe {
    id: string
    founderId: string
    developerId: string
    direction: 'LIKE' | 'DISLIKE'
    status?: 'PENDING' | 'ACCEPTED' | 'REJECTED'
    createdAt: string
  }
  
  export interface SwipeData {
    direction: 'LIKE' | 'DISLIKE'
  }