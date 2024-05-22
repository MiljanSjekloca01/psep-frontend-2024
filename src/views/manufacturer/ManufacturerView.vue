<script setup lang="ts">
import { ref } from "vue";
import { formatDate } from "../../services/main.service";
import type { ManufacturerModel } from "../../models/manufacturer.model";
import { ManufacturerService } from "../../services/manufacturer.service";


const manufacturers = ref<ManufacturerModel[]>()
ManufacturerService.getAllManufacturers().then(rsp => {
    manufacturers.value = rsp.data
})

async function removeThisManufacturer(id: number){
    await ManufacturerService.deleteManufacturerById(id).then(rsp => {
        console.log(rsp);
        manufacturers.value = manufacturers.value?.filter(m => m.manufacturerId !== id )
    }) 

}


</script>

<template>

<div v-if="manufacturers">   
    <h1 class="h3">Manufacturers</h1>
    <table class="table text-center">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Created at</th>
        <th scope="col">Updated at</th>
        <th scope="col">Options</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="m in manufacturers">
        <th scope="row">{{ m.manufacturerId }}</th>
        <td>{{ m.name }}</td>
        <td>{{ formatDate(m.createdAt) }}</td>
        <td>{{ formatDate(m.updatedAt) }}</td>
        <td>
            <div class="btn-group">
                <RouterLink class="btn btn-sm btn-secondary m-2" :to="`/manufacturer/${m.manufacturerId}`">
                    <i class="fa-solid fa-pencil"></i></RouterLink>
            
                <button type="button" class="btn btn-sm btn-danger m-2"
                    @click="removeThisManufacturer(m.manufacturerId)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
        </tr>
        </tbody>
    </table>
    <RouterLink class="btn btn-md btn-success" to="/manufacturer/new">
    <i class="fa-solid fa-circle-plus"></i>
    Add New Manufacturer</RouterLink>
</div> 

<div v-else>Manufacturers are being loaded... Please wait</div>

</template>