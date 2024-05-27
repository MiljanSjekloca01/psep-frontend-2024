import axios, { AxiosError, type AxiosResponse } from "axios";
import { AuthService,isAuthenticated } from "./auth.service";

const client = axios.create({
    baseURL:"http://localhost:4000/api",
    headers:{
        "Accept": "application/json"
    },
    validateStatus: (status)=> {
        return status.toString().startsWith("2");
    }
})


async function sendRequest(path: string, method: string, payload: any, token: string): Promise<AxiosResponse> {
        return await client.request({
            url: path,
            method: method,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: payload
        });
}


export async function useAxios(path: string,method = "get",payload = {}){
    let rsp: AxiosResponse
    try{
        rsp = await sendRequest(path,method,payload,AuthService.getAccessToken())
        isAuthenticated.value = true
    }catch(e){
        rsp = (e as AxiosError).response as AxiosResponse
    }

    if(rsp == undefined  || rsp.status == 401){ 
        window.location.href="/login"
        // pokrece novi request i prekida ovaj.
    }
    if(rsp.status == 403){
        try{
            const token = await sendRequest("/user/refresh","post",payload,AuthService.getRefreshToken())
            AuthService.saveAuth(token.data)
            return await sendRequest(path,method,payload,AuthService.getAccessToken())
        }catch(e){
           AuthService.clearAuth()
           throw new Error("REFRESH_TOKEN_EXPIRED")
        }
    }
    if(rsp.status === 404){ throw new Error("NOT_FOUND") }
    
    
    return rsp;

}


export function formatDate(iso: string){
    if(iso == null || undefined){
        return "N/A"
    }
    return new Date(iso).toLocaleString("sr-RS");
}

export async function login(username: string,password: string){
    return await client.request({
        url: "/user/login",
        method: "post",
        data:{
            username: username,
            password: password
        }
    })
    // prosirio bi sa try catch i saveAuth
}