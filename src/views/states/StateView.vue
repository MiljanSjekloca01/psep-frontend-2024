<script setup lang="ts">
import { ref } from "vue";
import { formatDate } from "../../services/main.service";
import type { StateModel } from "../../models/state.model";
import { StateService } from "../../services/state.service";


const states = ref<StateModel[]>()
StateService.getAllStates().then(rsp => {
    states.value = rsp.data
})

async function removeThisState(id: number){
    await StateService.deleteStateById(id).then(rsp => {
        console.log(rsp);
        states.value = states.value?.filter(s => s.stateId !== id )
    }) 

}


</script>

<template>

<div v-if="states">   
    <h1 class="h3">States</h1>
    <table class="table">
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
        <tr v-for="s in states">
        <th scope="row">{{ s.stateId }}</th>
        <td>{{ s.name }}</td>
        <td>{{ formatDate(s.createdAt) }}</td>
        <td>{{ formatDate(s.updatedAt) }}</td>
        <td>
            <div class="btn-group">
                <RouterLink class="btn btn-sm btn-secondary m-2" :to="`/state/${s.stateId}`">
                    <i class="fa-solid fa-pencil"></i></RouterLink>
            
                <button type="button" class="btn btn-sm btn-danger m-2"
                    @click="removeThisState(s.stateId)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>  
        </td>
        </tr>
        </tbody>
    </table>
    <RouterLink class="btn btn-md btn-success" to="/state/new">
    <i class="fa-solid fa-circle-plus"></i>
    Add New State</RouterLink>
</div> 

<div v-else>States are being loaded... Please wait</div>

</template>