<script setup lang="ts">
import { ref } from "vue";
import { formatDate } from "../../services/main.service";
import type { TypeModel } from "../../models/type.model";
import { TypeService } from "@/services/type.service";



const types = ref<TypeModel[]>()
TypeService.getAllTypes().then(rsp => {
    types.value = rsp.data
})

async function removeThisType(id: number){
    await TypeService.deleteTypeById(id).then(rsp => {
        console.log(rsp);
        types.value = types.value?.filter(t => t.typeId !== id )
    }) 

}


</script>

<template>

<div v-if="types">   
    <h1 class="h3">Types</h1>
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
        <tr v-for="t in types">
        <th scope="row">{{ t.typeId }}</th>
        <td>{{ t.name }}</td>
        <td>{{ formatDate(t.createdAt) }}</td>
        <td>{{ formatDate(t.updatedAt) }}</td>
        <td>
            <div class="btn-group">
                <RouterLink class="btn btn-sm btn-secondary m-2" :to="`/type/${t.typeId}`">
                    <i class="fa-solid fa-pencil"></i></RouterLink>
            
                <button type="button" class="btn btn-sm btn-danger m-2"
                    @click="removeThisType(t.typeId)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
        </tr>
        </tbody>
    </table>
    <RouterLink class="btn btn-md btn-success" to="/type/new">
    <i class="fa-solid fa-circle-plus"></i>
    Add New Type</RouterLink>
</div> 

<div v-else>Types are being loaded... Please wait</div>

</template>