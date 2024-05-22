<script setup lang="ts">
import type { ManufacturerModel } from '@/models/manufacturer.model';
import type { ModelModel } from '@/models/model.model';
import type { TypeModel } from '@/models/type.model';
import { ManufacturerService } from '@/services/manufacturer.service';
import { ModelService } from '@/services/model.service';
import { TypeService } from '@/services/type.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const model = ref<any>({
    name: "",
    manufacturerId: 0,
    typeId: 0,
})

const types = ref<TypeModel[]>()
TypeService.getAllTypes().then(rsp => {
    types.value = rsp.data
})

const manufacturers = ref<ManufacturerModel[]>()
ManufacturerService.getAllManufacturers().then(rsp => {
    manufacturers.value = rsp.data
})


    
async function onCreateModelClicked(model: ModelModel){
    await ModelService.createModel(model).then(rsp => {
        router.push({ path: "./"})
    })
}


function validationCheck(model: any) {
    const { name, manufacturerId, typeId } = model;
    const isInvalidName = name === '' || name.length < 2;
    const isInvalidManuId = manufacturerId == 0;
    const isInvalidTypeId = typeId == 0;
    return isInvalidName || isInvalidManuId || isInvalidTypeId;
}

</script>

<template>
    <div>
        <h1 class="h3">Create Model</h1>
        <form>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="model.name" >
            </div>
            <div class="mb-3">
                <label for="manufacturerId" class="form-label">Manufacturers</label>
                <select class="form-select" aria-label="Default select example" v-model="model.manufacturerId">
                    <option selected value=0>Select from available manufacturers</option>
                    <option v-for="m in manufacturers" :value="m.manufacturerId">{{ m.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="typeId" class="form-label">Available Types</label>
                <select class="form-select" aria-label="Default select example" v-model="model.typeId">
                    <option selected value=0>Select from available types</option>
                    <option v-for="t in types" :value="t.typeId">{{ t.name }}</option>
                </select>
            </div>  
        </form>
        <RouterLink class="btn btn-md btn-secondary" to="./">
        <i class="fa-solid fa-rotate-left"></i>
        Return</RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
        @click="onCreateModelClicked(model)" :disabled="validationCheck(model)">
        <i class="fa-solid fa-download"></i>
        Create Model</button>
    </div>
</template>