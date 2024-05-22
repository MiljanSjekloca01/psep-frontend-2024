import type { ModelModel } from "@/models/model.model";
import { useAxios } from "./main.service";

export class ModelService {
    
    static async getAllModels(){
        return await useAxios("/model");
    }

    static async deleteModelById(id: number){
        return await useAxios("/model/delete/" + id,"put")
    }

    static async getModelById(id: number){
        return await useAxios(`/model/${id}`)
    }

    static async updateModelById(id: number, model: any){
        return await useAxios(`/model/update/${id}`,"put",model)
    }

    static async createModel(model: any){
        return await useAxios("/model/create","post",model)
    }

}