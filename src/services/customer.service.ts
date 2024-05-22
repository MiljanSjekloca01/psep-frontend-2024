import type { CustomerModel } from "@/models/customer.model";
import { useAxios } from "./main.service";

export class CustomerService {
    
    static async getAllCustomers(){
        return await useAxios("/customer");
    }

    static async deleteCustomerById(id: number){
        return await useAxios("/customer/delete/" + id,"put")
    }

    static async getCustomerById(id: number){
        return await useAxios(`/customer/${id}`)
    }

    static async updateCustomerById(id: number, data: CustomerModel){
        return await useAxios(`/customer/update/${id}`,"put",data)
    }

    static async createCustomer(data: CustomerModel){
        return await useAxios("/customer/create","post",data)
    }

}