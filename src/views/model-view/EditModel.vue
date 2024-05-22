<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '@/services/main.service';
import type { TypeModel } from '@/models/type.model';
import type { ManufacturerModel } from '@/models/manufacturer.model';
import { ModelService } from '@/services/model.service';
import { TypeService } from '@/services/type.service';
import { ManufacturerService } from '@/services/manufacturer.service';

const route = useRoute()
const router = useRouter();

const id = Number.parseInt(route.params.id as any)
var oldModelData: any;

const types = ref<TypeModel[]>()
TypeService.getAllTypes().then(rsp => {
    types.value = rsp.data
})

const manufacturers = ref<ManufacturerModel[]>()
ManufacturerService.getAllManufacturers().then(rsp => {
    manufacturers.value = rsp.data
})

const model = ref<any>()
ModelService.getModelById(id).then(rsp => {
    model.value = rsp.data
    oldModelData = {...rsp.data}
})

async function updateEditedModel(model: any){
    await ModelService.updateModelById(id,model).then(rsp => {
        router.push({ path: "./"})
    })
}


function validationCheck(model: any) {
    const { name, manufacturerId, typeId } = model;

    const isInvalidName = name === '' || name.length < 2;
    const isUnedited = (
        name === oldModelData.name &&
        manufacturerId === oldModelData.manufacturerId &&
        typeId === oldModelData.typeId 
    )

    return isInvalidName || isUnedited;
}

</script>

<template>
    <div v-if="model">
        <h1 class="h3">Edit Model</h1>
        <form>
            <div class="mb-3">
                <label for="id" class="form-label">ID</label>
                <input type="number" class="form-control" id="id" disabled :value="model.modelId">
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="model.name">
            </div>
            <div class="mb-3">
                <label for="manufacturerId" class="form-label">Manufacturers</label>
                <select class="form-select" aria-label="Default select example" v-model="model.manufacturerId">
                    <option v-for="m in manufacturers" :value="m.manufacturerId">{{ m.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="typeId" class="form-label">Available Types</label>
                <select class="form-select" aria-label="Default select example" v-model="model.typeId">
                    <option v-for="t in types" :value="t.typeId">{{ t.name }}</option>
                </select>
            </div>  
            <div class="mb-3">
                <label for="createdAt" class="form-label">Created At:</label>
                <input type="text" class="form-control" id="createdAt" disabled :value="formatDate(model.createdAt)">
            </div>
            <div class="mb-3">
                <label for="updatedAt" class="form-label">Last Updated At:</label>
                <input type="text" class="form-control" id="updatedAt" disabled :value="formatDate(model.updatedAt)">
            </div>
        </form>
        <RouterLink class="btn btn-md btn-secondary" to="./">
        <i class="fa-solid fa-rotate-left"></i> 
        Return</RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
        @click="updateEditedModel(model)" :disabled="validationCheck(model)">
        <i class="fa-solid fa-download"></i>
        Save</button>
    </div>
</template>