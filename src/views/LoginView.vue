<script setup lang="ts">
import { AuthService } from '@/services/auth.service';
import { login } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref<string>("")
const password = ref<string>("")
const router = useRouter()

// stavio bi try i to sve unutar login funkcije
async function doLogin(){
    try{
        if(username.value == "" || password.value == "") return
        const rsp = await login(username.value,password.value)
        AuthService.saveAuth(rsp.data)
        router.push({ path: "/customer"})
    }catch(e){
        username.value = ""
        password.value = ""
        alert(e)
    }
    
}

</script>

<template>
    <h2 class="mb-3 mt-3">Login</h2>
    <div class="login">
        <form @submit.prevent="doLogin">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username"
                 v-model="username" >
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password"
                v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<style>

.login{
    max-width: 800px;
    margin: auto;
}
</style>