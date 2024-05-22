<script setup lang="ts">
import { ManufacturerService } from '@/services/manufacturer.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()
const manufacturer = ref<any>({
    name: ""
})
    

async function onCreateManufacturerClicked(name: string){
   await ManufacturerService.createManufacturer(name).then(rsp => {
        router.push({ path: "./"})
   })
}

</script>

<template>
    <div>
        <h1 class="h3">Create Manufacturer</h1>
        <form>
        
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="manufacturer.name" >
            </div>
        </form>
        <RouterLink class="btn btn-md btn-secondary" to="./">
        <i class="fa-solid fa-rotate-left"></i>
        Return</RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
        @click="onCreateManufacturerClicked(manufacturer.name)" :disabled="manufacturer.name === '' || manufacturer.name.length < 2">
        <i class="fa-solid fa-download"></i>
        Create Manufacturer</button>
    </div>
</template>