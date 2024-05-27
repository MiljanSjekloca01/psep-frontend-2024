<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '@/services/main.service';
import type { ServiceModel } from '@/models/service.model';
import { ServiceService } from '@/services/service.service';
import type { StateModel } from '@/models/state.model';
import { StateService } from '@/services/state.service';

const route = useRoute()
const router = useRouter();

const service_id = Number.parseInt(route.params.serviceId as any)
const device_id = Number.parseInt(route.params.deviceId as any)
const customer_id = Number.parseInt(route.params.customerId as any)

var oldServiceData: any;

const service = ref<ServiceModel>()
ServiceService.getServiceById(service_id).then(rsp => {
    service.value = rsp.data
    oldServiceData = {...rsp.data}
})


const states = ref<StateModel[]>()
StateService.getAllStates().then(rsp => {
    states.value = rsp.data
})


async function updateEditedService(model: ServiceModel){
    await ServiceService.updateServiceById(service_id,model).then(rsp => {
        router.push({ path: `/customer/${customer_id}/device/${device_id}/service`})
    })
}


function validationCheck(model: ServiceModel) {
    const { stateId } = model;
    const isUnedited = (
        stateId === oldServiceData.stateId
    )
    return isUnedited
}

</script>

<template>
    <div v-if="service">
        <h1 class="h3">Edit Service for Device ID: {{ device_id }} </h1>
        <form>
            <div class="mb-3">
                <label for="id" class="form-label">Service ID</label>
                <input type="number" class="form-control" id="id" disabled :value="service_id">
            </div>
            <div class="mb-3">
                <label for="code" class="form-label">Code</label>
                <input type="text" class="form-control" id="code" disabled :value="service.code">
            </div>
            <div class="mb-3">
                <label for="stateId" class="form-label">State</label>
                <select class="form-select" aria-label="Default select example" v-model="service.stateId">
                    <option v-for="s in states" :value="s.stateId">{{ s.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="createdAt" class="form-label">Created At:</label>
                <input type="text" class="form-control" id="createdAt" disabled :value="formatDate(service.createdAt)">
            </div>
            <div class="mb-3">
                <label for="createdBy" class="form-label">Created by:</label>
                <input type="text" class="form-control" id="createdBy" disabled :value="service.createdByUser.username">
            </div>
            <div class="mb-3">
                <label for="updatedAt" class="form-label">Last Updated At:</label>
                <input type="text" class="form-control" id="updatedAt" disabled :value="formatDate(service.updatedAt)">
            </div>
            <div class="mb-3">
                <label for="updatedBy" class="form-label">Last Updated by:</label>
                <input type="text" class="form-control" id="updatedBy" disabled
                :value="service.updatedByUser ? service.updatedByUser.username : 'N/A'">
            </div>
        </form>
        <RouterLink class="btn btn-md btn-secondary" :to="`/customer/${customer_id}/device/${device_id}/service`">
            <i class="fa-solid fa-rotate-left"></i> 
            Return
        </RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
            @click="updateEditedService(service)" :disabled="validationCheck(service)">
            <i class="fa-solid fa-download"></i>
            Save
        </button>
    </div>
</template>