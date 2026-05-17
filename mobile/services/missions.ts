import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateMissionData, UpdateMissionData } from '@/app/types/mission'
import { request } from "./api"

// Query keys
export const missionKeys = {
  all: ["missions"] as const,
  byId: (id: string) => ["missions", id] as const,  // ✅ byId + missions
}

// GET all missions
export const useMissions = () => {
  return useQuery({
    queryKey: missionKeys.all,
    queryFn: () => request("/missions"),
  })
}

// POST create mission
export const useCreateMission = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateMissionData) =>
      request("/missions", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: missionKeys.all })
    },
  })
}

// PATCH update mission
export const useUpdateMission = () => {
  const queryClient = useQueryClient()  // ✅ ajouté

  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UpdateMissionData }) =>  // ✅ string minuscule
      request(`/missions/${id}`, {  // ✅ missions avec s
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {  // ✅ ajouté
      queryClient.invalidateQueries({ queryKey: missionKeys.all })
    },
  })
}

// DELETE mission
export const useDeleteMission = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      request(`/missions/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: missionKeys.all })
    },
  })
}