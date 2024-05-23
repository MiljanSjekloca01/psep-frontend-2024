<script setup lang="ts">
import { StateService } from '@/services/state.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()
const state = ref<any>({
    name: ""
})
    

async function onCreateStateClicked(name: string){
   await StateService.createState(name).then(rsp => {
        router.push({ path: "/state"})
   })
}

</script>

<template>
    <div>
        <h1 class="h3">Create State</h1>
        <form>
        
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="state.name" >
            </div>
        </form>
        <RouterLink class="btn btn-md btn-secondary" to="/state">
        <i class="fa-solid fa-rotate-left"></i>
        Return</RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
            @click="onCreateStateClicked(state.name)" :disabled="state.name === '' || state.name.length < 2">
            <i class="fa-solid fa-download"></i>
            Create State
        </button>
    </div>
</template>