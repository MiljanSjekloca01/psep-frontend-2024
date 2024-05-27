import type { DeviceModel } from "./device.model";
import type { StateModel } from "./state.model";
import type { UserModel } from "./user.model";

export interface ServiceModel{
    serviceId: number,
    code: string,
    deviceId: number,
    stateId: number,
    createdAt: string,
    createdBy: UserModel,
    updatedAt: string,
    updatedBy: UserModel,
    device: DeviceModel,
    state: StateModel,
    updatedByUser: UserModel
    createdByUser: UserModel
}
