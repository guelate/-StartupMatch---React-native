
//Query keys
export const missionKeys = {
    all: ["missions"] as const,
    ById: (id: string) => ["mission", id] as const,
}

//get all missions
export const useMissions = () => {

    return useQuery({

    })
}

//create mission
export const useCreateMission = () => {
    return useMutation({

    })
}

//update mission
export const useUpdateMission = () => {
    return useMutation({

    })
}

//delete mission
export const useDeleteMission = () => {
    return useMutation({
        
    })
}