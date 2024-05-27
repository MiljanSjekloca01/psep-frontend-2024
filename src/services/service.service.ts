import type { ServiceModel } from "@/models/service.model";
import { useAxios } from "./main.service";


export class ServiceService {
    
    static async getAllServicesByDevice(id: number){
        return await useAxios("/service/device/" + id);
    }

    static async deleteServiceById(id: number){
        console.log(id);
        return await useAxios(`/service/delete/${id}`,"put")
    }

    static async getServiceById(id: number){
        return await useAxios(`/service/${id}`)
    }

    static async updateServiceById(id: number, model: ServiceModel){
        return await useAxios(`/service/update/${id}`,"put",model)
    }

    static async createService(model: ServiceModel){
        return await useAxios("/service/create","post",model)
    }
}