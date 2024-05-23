<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '@/services/main.service';
import type { StateModel } from '@/models/state.model';
import { StateService } from '@/services/state.service';

const route = useRoute()
const router = useRouter();
const id = Number.parseInt(route.params.id as any)
const state = ref<StateModel>()
var oldName = "";
StateService.getStateById(id).then(rsp => {
    state.value = rsp.data
    oldName = rsp.data.name
})


async function updateEditedState(name: string){
   await StateService.updateStateById(id,name).then(rsp => {
        router.push({ path: "/state"})
   })
}

</script>

<template>
    <div v-if="state">
        <h1 class="h3">Edit State</h1>
        <form>
            <div class="mb-3">
                <label for="id" class="form-label">ID</label>
                <input type="number" class="form-control" id="id" disabled :value="state.stateId">
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="state.name">
            </div>
            <div class="mb-3">
                <label for="createdAt" class="form-label">Created At:</label>
                <input type="text" class="form-control" id="createdAt" disabled :value="formatDate(state.createdAt)">
            </div>
            <div class="mb-3">
                <label for="updatedAt" class="form-label">Last Updated At:</label>
                <input type="text" class="form-control" id="updatedAt" disabled :value="formatDate(state.updatedAt)">
            </div>
        </form>
        <RouterLink class="btn btn-md btn-secondary" to="/state">
            <i class="fa-solid fa-rotate-left"></i> 
            Return
        </RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
            @click="updateEditedState(state.name)" :disabled="state.name === '' || state.name === oldName || state.name.length < 2">
            <i class="fa-solid fa-download"></i>
            Save
        </button>
    </div>
</template>