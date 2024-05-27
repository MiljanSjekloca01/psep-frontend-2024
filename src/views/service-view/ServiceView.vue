<script setup lang="ts">
import { ref } from "vue";
import { formatDate } from "../../services/main.service";
import type { ServiceModel } from "../../models/service.model";
import { ServiceService } from "../../services/service.service";
import { useRoute } from "vue-router";

const route = useRoute()
const device_id = Number.parseInt(route.params.deviceId as any)
const customer_id = Number.parseInt(route.params.customerId as any)
const services = ref<ServiceModel[]>()


ServiceService.getAllServicesByDevice(device_id).then(rsp => {
    services.value = rsp.data
    console.log(services.value)
})

async function removeThisService(id: number){
    await ServiceService.deleteServiceById(id).then(rsp => {
        services.value = services.value?.filter(s => s.serviceId !== id )
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
    <li class="breadcrumb-item active">{{ customer_id }} </li>
    <li class="breadcrumb-item">
        <RouterLink :to="`/customer/${customer_id}/device`" class="link-secondary link-offset-3">
            Devices
        </RouterLink>
    </li>
    <li class="breadcrumb-item active">{{ device_id }} </li>
    <li class="breadcrumb-item active" aria-current="page">Services</li>
  </ol>
</nav>

<div v-if="services && services.length > 0">   
    <h1 class="h3">Services </h1>
    <table class="table text-center">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Code</th>
        <th scope="col">Device ID</th>
        <th scope="col">State</th>
        <th scope="col">Created By</th>
        <th scope="col">Created at</th>
        <th scope="col">Updated at</th>
        <th scope="col">Updated By</th>
        <th scope="col">Options</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="s in services">
        <th scope="row">{{ s.serviceId }}</th>
        <td>{{ s.code }}</td>
        <td>{{ device_id }} </td>
        <td>
            <RouterLink :to="`/state/${s.state.stateId}`" class="link-warning link-offset-3">
                {{ s.state.name }}
            </RouterLink>
        </td>
        <td> {{ s.createdByUser.username }} </td>
        <td>{{ formatDate(s.createdAt) }}</td>
        <td>{{ formatDate(s.updatedAt) }}</td>
        <td> {{ s.updatedByUser ? s.updatedByUser.username : "N/A"}} </td>
        <td>
            <div class="btn-group">
                <RouterLink class="btn btn-sm btn-secondary m-1" :to="`/customer/${customer_id}/device/${device_id}/service/${s.serviceId}`">
                    <i class="fa-solid fa-pencil"></i>
                </RouterLink>
            
                <button type="button" class="btn btn-sm btn-danger m-1"
                    @click="removeThisService(s.serviceId)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
        </tr>
        </tbody>
    </table>
    <RouterLink class="btn btn-md btn-success" :to="`/customer/${customer_id}/device/${device_id}/service/new`">
    <i class="fa-solid fa-circle-plus"></i>
    Add New Service
    </RouterLink>&nbsp;
    <RouterLink class="btn btn-md btn-secondary" :to="`/customer/${customer_id}/device`">
        <i class="fa-solid fa-rotate-left"></i> 
        Return
    </RouterLink>
</div> 

<div v-else>
    <div class="mb-3">Service are being loaded.. or there is no any</div>
    <RouterLink class="btn btn-md btn-success" :to="`/customer/${customer_id}/device/${device_id}/service/new`">
    <i class="fa-solid fa-circle-plus"></i>
    Add New Service
    </RouterLink>
</div>

</template>