<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '@/services/main.service';
import type { ManufacturerModel } from '@/models/manufacturer.model';
import { ManufacturerService } from '@/services/manufacturer.service';

const route = useRoute()
const router = useRouter();
const id = Number.parseInt(route.params.id as any)
const manufacturer = ref<ManufacturerModel>()
var oldName = "";
ManufacturerService.getManufacturerById(id).then(rsp => {
    manufacturer.value = rsp.data
    oldName = rsp.data.name
})


async function updateEditedManufacturer(name: string){
   await ManufacturerService.updateManufacturerById(id,name).then(rsp => {
        router.push({ path: "/manufacturer"})
   })
}

</script>

<template>
    <div v-if="manufacturer">
        <h1 class="h3">Edit Manufacturer</h1>
        <form>
            <div class="mb-3">
                <label for="id" class="form-label">ID</label>
                <input type="number" class="form-control" id="id" disabled :value="manufacturer.manufacturerId">
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="manufacturer.name">
            </div>
            <div class="mb-3">
                <label for="createdAt" class="form-label">Created At:</label>
                <input type="text" class="form-control" id="createdAt" disabled :value="formatDate(manufacturer.createdAt)">
            </div>
            <div class="mb-3">
                <label for="updatedAt" class="form-label">Last Updated At:</label>
                <input type="text" class="form-control" id="updatedAt" disabled :value="formatDate(manufacturer.updatedAt)">
            </div>
        </form>
        <RouterLink class="btn btn-md btn-secondary" to="/manufacturer">
            <i class="fa-solid fa-rotate-left"></i> 
            Return
        </RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
            @click="updateEditedManufacturer(manufacturer.name)" :disabled="manufacturer.name === '' || manufacturer.name === oldName || manufacturer.name.length < 2">
            <i class="fa-solid fa-download"></i>
            Save
        </button>
    </div>
</template>