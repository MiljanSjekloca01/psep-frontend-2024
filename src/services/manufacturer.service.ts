import { useAxios } from "./main.service";

export class ManufacturerService {
    
    static async getAllManufacturers(){
        return await useAxios("/manufacturer");
    }

    static async deleteManufacturerById(id: number){
        return await useAxios("/manufacturer/delete/" + id,"put")
    }

    static async getManufacturerById(id: number){
        return await useAxios(`/manufacturer/${id}`)
    }

    static async updateManufacturerById(id: number, name: string){
        const payload = { name: name };
        return await useAxios(`/manufacturer/update/${id}`,"put",payload)
    }

    static async createManufacturer(name: string){
        const payload = { name: name };
        return await useAxios("/manufacturer/create","post",payload)
    }

}