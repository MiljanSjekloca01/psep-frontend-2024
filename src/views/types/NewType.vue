<script setup lang="ts">
import { TypeService } from '@/services/type.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()
const type = ref<any>({
    name: ""
})
    
    


async function onCreateTypeClicked(name: string){
   await TypeService.createType(name).then(rsp => {
        router.push({ path: "./"})
   })
}

</script>

<template>
    <div>
        <h1 class="h3">Create Type</h1>
        <form>
        
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="type.name" >
            </div>
        </form>
        <RouterLink class="btn btn-md btn-secondary" to="./">
        <i class="fa-solid fa-rotate-left"></i>
        Return</RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
        @click="onCreateTypeClicked(type.name)" :disabled="type.name === '' || type.name.length < 2">
        <i class="fa-solid fa-download"></i>
        Create Type</button>
    </div>
</template>