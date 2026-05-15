import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateMissionData, UpdateMissionData } from '@/app/types/mission'
import { request } from "./api"

//Query keys
export const missionKeys = {
    all: ["missions"] as const,
    ById: (id: string) => ["mission", id] as const,
}

//get all missions
export const useMissions = () => {

    return useQuery({
        queryKey: missionKeys.all,
        queryFn: () => request("/missions"),
    })
}

//create mission
export const useCreateMission = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateMissionData) =>
            request("/missions", {
                method: "POST",
                body: JSON.stringify(data),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: missionKeys.all })
        }
    })
}

//update mission
export const useUpdateMission = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: String, data: UpdateMissionData }) =>
            request(`/mission/${id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
            })
    })
}

//delete mission
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