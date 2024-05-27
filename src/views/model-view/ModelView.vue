<script setup lang="ts">
import { ref } from "vue";
import { formatDate } from "../../services/main.service";
import type { ModelModel } from "../../models/model.model";
import { ModelService } from "../../services/model.service";


const models = ref<ModelModel[]>()
ModelService.getAllModels().then(rsp => {
    models.value = rsp.data
})

async function removeThisModel(id: number){
    await ModelService.deleteModelById(id).then(rsp => {
        models.value = models.value?.filter(m => m.modelId !== id )
    }) 

}


</script>

<template>

<div v-if="models && models.length > 0">   
    <h1 class="h3">Models</h1>
    <table class="table text-center">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Manufacturer</th>
        <th scope="col">Type</th>
        <th scope="col">Created at</th>
        <th scope="col">Updated at</th>
        <th scope="col">Options</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="m in models">
        <th scope="row">{{ m.modelId }}</th>
        <td>{{ m.name }}</td>
        <td>{{ m.manufacturer.name }}</td>
        <td>{{ m.type.name }}</td>
        <td>{{ formatDate(m.createdAt) }}</td>
        <td>{{ formatDate(m.updatedAt) }}</td>
        <td>
            <div class="btn-group">
                <RouterLink class="btn btn-sm btn-secondary m-1" :to="`/model/${m.modelId}`">
                    <i class="fa-solid fa-pencil"></i></RouterLink>
            
                <button type="button" class="btn btn-sm btn-danger m-1"
                    @click="removeThisModel(m.modelId)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
        </tr>
        </tbody>
    </table>
    <RouterLink class="btn btn-md btn-success" to="/model/new">
        <i class="fa-solid fa-circle-plus"></i>
        Add New Model
    </RouterLink>
</div> 

<div v-else-if="models?.length == 0">
    <div class="mb-3">Create a new model</div>    
    <RouterLink class="btn btn-md btn-success" to="/model/new">
        <i class="fa-solid fa-circle-plus"></i>
        Add New Model
    </RouterLink>
</div>

<div v-else>Models are being loaded... Please wait</div>

</template>