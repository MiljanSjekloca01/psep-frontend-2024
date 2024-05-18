<script setup lang="ts">

import type { TypeModel } from '@/models/type.model';
import { TypeService } from '@/services/type.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '@/services/main.service';

const route = useRoute()
const router = useRouter();
const id = Number.parseInt(route.params.id as any)
const type = ref<TypeModel>()
var oldName = "";
TypeService.getTypeById(id).then(rsp => {
    type.value = rsp.data
    oldName = rsp.data.name
})


async function updateEditedType(name: string){
   await TypeService.updateTypeById(id,name).then(rsp => {
        router.push({ path: "./"})
   })
}

</script>

<template>
    <div v-if="type">
        <h1 class="h3">Edit Type</h1>
        <form>
            <div class="mb-3">
                <label for="id" class="form-label">ID</label>
                <input type="number" class="form-control" id="id" disabled :value="type.typeId">
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="type.name">
            </div>
            <div class="mb-3">
                <label for="createdAt" class="form-label">Created At:</label>
                <input type="text" class="form-control" id="createdAt" disabled :value="formatDate(type.createdAt)">
            </div>
            <div class="mb-3">
                <label for="updatedAt" class="form-label">Last Updated At:</label>
                <input type="text" class="form-control" id="updatedAt" disabled :value="formatDate(type.updatedAt)">
            </div>
        </form>
        <RouterLink class="btn btn-md btn-secondary" to="./">
        <i class="fa-solid fa-rotate-left"></i> 
        Return</RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
        @click="updateEditedType(type.name)" :disabled="type.name === '' || type.name === oldName || type.name.length < 2">
        <i class="fa-solid fa-download"></i>
        Save</button>
    </div>
</template>