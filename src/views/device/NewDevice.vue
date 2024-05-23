<script setup lang="ts">
import type { DeviceModel } from '@/models/device.model';
import type { ModelModel } from '@/models/model.model';
import { DeviceService } from '@/services/device.service';
import { ModelService } from '@/services/model.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const id = Number.parseInt(route.params.id as any)

const router = useRouter()
const device = ref<any>({
    sn: "",
    modelId: 0,
    customerId: id,
})

const models = ref<ModelModel[]>()
ModelService.getAllModels().then(rsp => {
    models.value = rsp.data
})


async function onCreateDeviceClicked(model: DeviceModel){
    await DeviceService.createDevice(model).then(rsp => {
        router.push({ path: `/customer/${id}/device`})
    })
}


function validationCheck(model: DeviceModel) {
    const { sn, modelId } = model;
    const isInvalidSn = sn === '' || sn.length < 6;
    const isInvalidModelId = modelId == 0;
    return isInvalidSn || isInvalidModelId;
}

</script>

<template>
    <div>
        <h1 class="h3">Create Device</h1>
        <form>
            <div class="mb-3">
                <label for="sn" class="form-label">Serial Number</label>
                <input type="text" class="form-control" id="sn" v-model="device.sn" >
            </div>
            <div class="mb-3">
                <label for="modelsId" class="form-label">Model</label>
                <select class="form-select" aria-label="Default select example" v-model="device.modelId">
                    <option selected value=0>Select from available manufacturers</option>
                    <option v-for="m in models" :value="m.modelId">{{ m.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="customerId" class="form-label">Customer ID</label>
                <input type="text" class="form-control" id="customerId" disabled :value="device.customerId" >
            </div>  
        </form>
        <RouterLink class="btn btn-md btn-secondary" :to="`/customer/${id}/device`">
            <i class="fa-solid fa-rotate-left"></i>
            Return
        </RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
            @click="onCreateDeviceClicked(device)" :disabled="validationCheck(device)">
            <i class="fa-solid fa-download"></i>
            Create Device
        </button>
    </div>
</template>