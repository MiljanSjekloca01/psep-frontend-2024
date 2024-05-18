import { useAxios } from "./main.service";

export class StateService {
    
    static async getAllStates(){
        return await useAxios("/state");
    }

    static async deleteStateById(id: number){
        return await useAxios("/state/delete/" + id,"put")
    }

    static async getStateById(id: number){
        return await useAxios(`/state/${id}`)
    }

    static async updateStateById(id: number, name: string){
        const payload = { name: name };
        return await useAxios(`/state/update/${id}`,"put",payload)
    }

    static async createState(name: string){
        const payload = { name: name };
        return await useAxios("/state/create","post",payload)
    }

}