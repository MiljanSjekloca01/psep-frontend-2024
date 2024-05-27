<script setup lang="ts">
import type { ServiceModel } from '@/models/service.model';
import type { ModelModel } from '@/models/model.model';
import { ServiceService } from '@/services/service.service';
import { ModelService } from '@/services/model.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { StateService } from '@/services/state.service';
import type { StateModel } from '@/models/state.model';

const route = useRoute()
const device_id = Number.parseInt(route.params.deviceId as any)
const customer_id = Number.parseInt(route.params.customerId as any)

const router = useRouter()
const service = ref<any>({
    code: "",
    deviceId: device_id,
    stateId: 0
})

const states = ref<StateModel[]>()
StateService.getAllStates().then(rsp => {
    states.value = rsp.data
})


async function onCreateServiceClicked(model: ServiceModel){
    await ServiceService.createService(model).then(rsp => {
        console.log(model);
        router.push({ path: `/customer/${customer_id}/device/${device_id}/service`})
    })
}


function validationCheck(model: ServiceModel) {
    const { code, stateId } = model;
    const isInvalidCode = code === '' || code.length < 3;
    const isInvalidModelId = stateId == 0;
    return isInvalidCode|| isInvalidModelId;
}

</script>

<template>
    <div>
        <h1 class="h3">Create Service</h1>
        <form>
            <div class="mb-3">
                <label for="code" class="form-label">Code</label>
                <input type="text" class="form-control" id="code" v-model="service.code" >
            </div>
            <div class="mb-3">
                <label for="stateId" class="form-label">State</label>
                <select class="form-select" aria-label="Default select example" v-model="service.stateId">
                    <option selected value=0>Select from available states</option>
                    <option v-for="s in states" :value="s.stateId">{{ s.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="customerId" class="form-label">Customer ID</label>
                <input type="text" class="form-control" id="customerId" disabled :value="customer_id" >
            </div>
            <div class="mb-3">
                <label for="deviceId" class="form-label">Device ID</label>
                <input type="text" class="form-control" id="deviceId" disabled :value="device_id" >
            </div>  
        </form>
        <RouterLink class="btn btn-md btn-secondary" :to="`/customer/${customer_id}/device/${device_id}/service`">
            <i class="fa-solid fa-rotate-left"></i>
            Return
        </RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
            @click="onCreateServiceClicked(service)" :disabled="validationCheck(service)">
            <i class="fa-solid fa-download"></i>
            Create Service
        </button>
    </div>
</template>