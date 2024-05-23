import type { DeviceModel } from "@/models/device.model";
import { useAxios } from "./main.service";


export class DeviceService {
    
    static async getAllDevicesByCustomerId(id: number){
        return await useAxios("/device/customer/" + id);
    }

    static async deleteDeviceById(id: number){
        return await useAxios("/device/delete/" + id,"put")
    }

    static async getDeviceById(id: number){
        return await useAxios(`/device/${id}`)
    }

    static async updateDeviceById(id: number, model: DeviceModel){
        return await useAxios(`/device/update/${id}`,"put",model)
    }

    static async createDevice(model: DeviceModel){
        return await useAxios("/device/create","post",model)
    }
}