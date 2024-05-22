import type { ManufacturerModel } from "./manufacturer.model";
import type { TypeModel } from "./type.model";

export interface ModelModel {
    modelId: number,
    name: string,
    manufacturer: ManufacturerModel,
    type: TypeModel,
    createdAt: string,
    updatedAt: string
}