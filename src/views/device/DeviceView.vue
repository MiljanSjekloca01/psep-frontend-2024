<script setup lang="ts">
import { ref } from "vue";
import { formatDate } from "../../services/main.service";
import type { DeviceModel } from "../../models/device.model";
import { DeviceService } from "../../services/device.service";
import { useRoute } from "vue-router";

const route = useRoute()
const id = Number.parseInt(route.params.id as any)
const devices = ref<DeviceModel[]>()


DeviceService.getAllDevicesByCustomerId(id).then(rsp => {
    devices.value = rsp.data
})

async function removeThisDevice(id: number){
    await DeviceService.deleteDeviceById(id).then(rsp => {
        devices.value = devices.value?.filter(d => d.deviceId !== id )
    }) 

}


</script>

<template>

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
        <RouterLink to="/customer" class="link-secondary link-offset-3">
            Customers
        </RouterLink>
    </li>
    <li class="breadcrumb-item active">{{ id }} </li>
    <li class="breadcrumb-item active" aria-current="page">Devices</li>
  </ol>
</nav>

<div v-if="devices && devices.length > 0">   
    <h1 class="h3" v-if="devices[0]">{{devices[0].customer.name }} Devices </h1>
    <table class="table text-center">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Serial Number</th>
        <th scope="col">Model</th>
        <th scope="col">Type</th>
        <th scope="col">Manufacturer</th>
        <th scope="col">Created at</th>
        <th scope="col">Updated at</th>
        <th scope="col">Options</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="d in devices">
        <th scope="row">{{ d.deviceId }}</th>
        <td>{{ d.sn }}</td>
        <td>
            <RouterLink class="link-warning link-offset-3" :to="`/model/${d.model.modelId}`">
                {{ d.model.name }}
            </RouterLink>
        </td>
        <td>
            <RouterLink :to="`/type/${d.model.type.typeId}`" class="link-warning link-offset-3">
                {{ d.model.type.name }}
            </RouterLink>
        </td>
        <td>
            <RouterLink :to="`/manufacturer/${d.model.manufacturer.manufacturerId}`" class="link-warning link-offset-3">
                {{ d.model.manufacturer.name }}
            </RouterLink>
        </td>
        <td>{{ formatDate(d.createdAt) }}</td>
        <td>{{ formatDate(d.updatedAt) }}</td>
        <td>
            <div class="btn-group">
                <RouterLink class="btn btn-sm btn-secondary m-1" :to="`device/${d.deviceId}`">
                    <i class="fa-solid fa-pencil"></i>
                </RouterLink>
                
                <RouterLink class="btn btn-sm btn-primary m-1" 
                    :to="`/customer/${id}/device/${d.deviceId}/service`">
                    <i class="fa-solid fa-key"></i>
                </RouterLink>

                <button type="button" class="btn btn-sm btn-danger m-1"
                    @click="removeThisDevice(d.deviceId)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
        </tr>
        </tbody>
    </table>
    <RouterLink class="btn btn-md btn-success" :to="`/customer/${id}/device/new`">
    <i class="fa-solid fa-circle-plus"></i>
    Add New Device
    </RouterLink>
</div> 

<div v-else-if="devices?.length == 0">
    <div class="mb-3">Create a new device for Customer with ID {{ id }}</div>    
    <RouterLink class="btn btn-md btn-success" :to="`/customer/${id}/device/new`">
        <i class="fa-solid fa-circle-plus"></i>
        Add New Device
    </RouterLink>
</div>

<div v-else>
    <div class="mb-3">Device are being loaded..</div>    
</div>

</template>