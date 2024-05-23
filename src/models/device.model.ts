import type { CustomerModel } from "./customer.model"
import type { ModelModel } from "./model.model"

export interface DeviceModel{
    deviceId: number,
    sn: string,
    createdAt: string,
    updatedAt: string
    model: ModelModel,
    customer: CustomerModel,
    modelId: number;
    customerId: number;
}