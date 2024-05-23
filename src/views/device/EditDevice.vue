<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '@/services/main.service';
import { ModelService } from '@/services/model.service';
import type { ModelModel } from '@/models/model.model';
import type { DeviceModel } from '@/models/device.model';
import { DeviceService } from '@/services/device.service';
import type { CustomerModel } from '@/models/customer.model';
import { CustomerService } from '@/services/customer.service';

const route = useRoute()
const router = useRouter();

const id = Number.parseInt(route.params.id as any)
var oldDeviceData: any;

const device = ref<DeviceModel>()
DeviceService.getDeviceById(id).then(rsp => {
    device.value = rsp.data
    oldDeviceData = {...rsp.data}
})

const models = ref<ModelModel[]>()
ModelService.getAllModels().then(rsp => {
    models.value = rsp.data
})

const customers = ref<CustomerModel[]>()
CustomerService.getAllCustomers().then(rsp => {
    customers.value = rsp.data
})

async function updateEditedDevice(model: DeviceModel){
    await DeviceService.updateDeviceById(id,model).then(rsp => {
        router.push({ path: `/customer/${model.customerId}/device`})
    })
}


function validationCheck(model: DeviceModel) {
    const { sn, modelId, customerId } = model;
    const isInvalidSn = sn === '' || sn.length < 6;

    const isUnedited = (
        sn === oldDeviceData.sn &&
        modelId === oldDeviceData.modelId &&
        customerId === oldDeviceData.customerId 
    )

    return isInvalidSn || isUnedited
}

</script>

<template>
    <div v-if="device">
        <h1 class="h3">Edit Device for Customer ID: {{ oldDeviceData.customerId }}</h1>
        <form>
            <div class="mb-3">
                <label for="id" class="form-label">ID</label>
                <input type="number" class="form-control" id="id" disabled :value="device.deviceId">
            </div>
            <div class="mb-3">
                <label for="sn" class="form-label">Serial Number</label>
                <input type="text" class="form-control" id="sn" v-model="device.sn">
            </div>
            <div class="mb-3">
                <label for="modelsId" class="form-label">Model</label>
                <select class="form-select" aria-label="Default select example" v-model="device.modelId">
                    <option v-for="m in models" :value="m.modelId">{{ m.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="customerId" class="form-label">Customer ID</label>
                <select class="form-select" aria-label="Default select example" v-model="device.customerId">
                    <option v-for="c in customers" :value="c.customerId">{{ c.name }} - {{ c.customerId }}</option>
                </select>
            </div>  
            <div class="mb-3">
                <label for="createdAt" class="form-label">Created At:</label>
                <input type="text" class="form-control" id="createdAt" disabled :value="formatDate(device.createdAt)">
            </div>
            <div class="mb-3">
                <label for="updatedAt" class="form-label">Last Updated At:</label>
                <input type="text" class="form-control" id="updatedAt" disabled :value="formatDate(device.updatedAt)">
            </div>
        </form>
        <RouterLink class="btn btn-md btn-secondary" :to="`/customer/${device.customerId}/device`">
            <i class="fa-solid fa-rotate-left"></i> 
            Return
        </RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
            @click="updateEditedDevice(device)" :disabled="validationCheck(device)">
            <i class="fa-solid fa-download"></i>
            Save
        </button>
    </div>
</template>