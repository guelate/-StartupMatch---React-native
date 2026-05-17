import { useQuery } from '@tanstack/react-query'
import { request } from "./api"

// QUERY KEYS
export const matchKeys = {
  all: ["matches"] as const,
  byId: (id: string) => ["matches", id] as const,
}

// GET — all users matches
export const useMatches = () => {
  return useQuery({
    queryKey: matchKeys.all,
    queryFn: () => request("/matches"),
  })
}

// GET — a match by id
export const useMatch = (id: string) => {
  return useQuery({
    queryKey: matchKeys.byId(id),
    queryFn: () => request(`/matches/${id}`),
    enabled: !!id,
  })
}