import { request } from "./api";

//Authentification request 
export const authService = {

    //Login request 
    login: (email: string, password: string) =>
        request("/auth/login", {
            method:"POST",
            body: JSON.stringify({email,password})
        }),
    
    //register request
    register: (data: { name: string, email: string, password: string, role: string }) =>
        request("/auth/register", {
            method:"POST",
            body: JSON.stringify(data)
        })

}