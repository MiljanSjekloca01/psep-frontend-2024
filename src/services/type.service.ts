
import { useAxios } from "./main.service";


export class TypeService {
    
    static async getAllTypes(){
        return await useAxios("/type");
    }

    static async deleteTypeById(id: number){
        return await useAxios("/type/delete/" + id,"put")
    }

    static async getTypeById(id: number){
        return await useAxios(`/type/${id}`)
    }
    // ili typeModel umjesto name
    static async updateTypeById(id: number, name: string){
        const payload = { name: name };
        return await useAxios(`/type/update/${id}`,"put",payload)
    }

    static async createType(name: string){
        const payload = { name: name };
        return await useAxios("/type/create","post",payload)
    }
}