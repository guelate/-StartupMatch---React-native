export interface Mission {
    id: string
    title: string
    description: string
    status: 'OPEN' | 'CLOSED'
    founderId: string
    createdAt: string
    updatedAt: string
  }
  
  export interface CreateMissionData {
    title: string
    description: string
  }
  
  export interface UpdateMissionData {
    title?: string
    description?: string
    status?: 'OPEN' | 'CLOSED'
  }