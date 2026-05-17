import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { request } from "./api"

// QUERY KEYS
export const swipeKeys = {
  pending: ["swipes", "pending"] as const,
  all: ["swipes"] as const,
}

// GET Pending swipes
export const usePendingSwipes = () => {
  return useQuery({
    queryKey: swipeKeys.pending,
    queryFn: () => request("/swipes/pending"),
  })
}

// POST — Swipe a mission (DEVELOPER)
export const useSwipeMission = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      missionId,
      direction,
    }: {
      missionId: string
      direction: "LIKE" | "DISLIKE"
    }) =>
      request("/swipes/mission", {
        method: "POST",
        body: JSON.stringify({ missionId, direction }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: swipeKeys.pending })
    },
  })
}

// POST — Swipe a profil developer (FOUNDER)
export const useSwipeProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      developerId,
      direction,
    }: {
      developerId: string
      direction: "LIKE" | "DISLIKE"
    }) =>
      request("/swipes/profile", {
        method: "POST",
        body: JSON.stringify({ developerId, direction }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: swipeKeys.pending })
    },
  })
}

// update — accept or deny a swipe 
export const useRespondToSwipe = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: ({
        swipeId,
        status,
        type,  // ← "mission" ou "profile"
      }: {
        swipeId: string
        status: "ACCEPTED" | "REJECTED"
        type: "mission" | "profile"
      }) =>
        request(`/swipes/${type}/${swipeId}`, {
          method: "PATCH",
          body: JSON.stringify({ status }),
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: swipeKeys.pending })
        queryClient.invalidateQueries({ queryKey: ["matches"] })
      },
    })
  }