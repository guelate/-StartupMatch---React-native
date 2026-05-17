import { useQuery } from '@tanstack/react-query'
import { request } from "./api"

// QUERY KEYS
export const profileKeys = {
  all: ["profiles"] as const,
  byId: (id: string) => ["profiles", id] as const,
}

// GET — all developers
export const useProfiles = () => {
  return useQuery({
    queryKey: profileKeys.all,
    queryFn: () => request("/users/developers"),
  })
}

// GET — a developer
export const useProfile = (id: string) => {
  return useQuery({
    queryKey: profileKeys.byId(id),
    queryFn: () => request(`/users/developers/${id}`),
    enabled: !!id,  // don't call api if id undifined
  })
}