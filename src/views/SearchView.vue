<script setup lang="ts">
import type { ServiceModel } from '@/models/service.model';
import { ServiceService } from '@/services/service.service';
import { ref } from 'vue';
import { formatDate } from '@/services/main.service';
import { AuthService, isAuthenticated } from '@/services/auth.service';

isAuthenticated.value = AuthService.hasAuth()
const search = ref<string>("")

if(!isAuthenticated.value){ window.location.href="/login" }

const service = ref<ServiceModel>()
let notMatchMessage = ref<string>()



function onSearch(){
    if(search.value == "") return
    ServiceService.getServiceByCode(search.value).then( rsp => {
        if(rsp.data === null){
            service.value = undefined
            notMatchMessage.value = "Service with this code not found"
        }else{
            service.value = rsp.data
        }
    })
}

function removeMessage(){
    notMatchMessage.value = "";
}


</script>



<template>
    <div class="input-search mt-3 mb-3">
        <form class="d-flex">
            <input class="form-control me-2 search" type="search" placeholder="Enter Your Service Code" aria-label="Search"
            v-model="search" @focus="removeMessage()">
            <button class="btn btn-outline-primary" type="button" @click="onSearch()">
                <i class="fa-solid fa-search"></i>
            </button>
        </form>
    </div>
    <div v-if="service">
        <p>Customer: {{ service.device.customer.name }}</p>
        <table class="table text-center table-striped mt-4 table-hover table-borderless">
            <tbody>
                <tr> <th scope="row">Code</th> <td>{{ service.code }}</td> </tr>
                <tr> <th scope="row">Model</th> <td>{{ service.device.model.name }}</td> </tr>
                <tr> <th scope="row">State</th> <td>{{ service.state.name }}</td> </tr>
                <tr> <th scope="row">Type</th> <td>{{ service.device.model.type.name }}</td> </tr>
                <tr> <th scope="row">Created By</th> <td>{{ service.createdByUser.username }}</td> </tr>
                <tr> <th scope="row">Created At</th> <td>{{ formatDate(service.createdAt) }}</td> </tr>
                <tr> <th scope="row">Updated By</th> <td>{{ service.updatedByUser ? service.updatedByUser.username : "N/A"}}</td> </tr>
                <tr> <th scope="row">Updated At</th> <td>{{ formatDate(service.updatedAt) }}</td> </tr>
                <tr>
                    <th colspan="2">
                        <RouterLink class="link-warning link-underline-opacity-0" :to="`/customer/${service.device.customerId}/device/${service.deviceId}/service/${service.serviceId}`">
                            Change service state
                        </RouterLink>
                    </th>
                </tr>
            </tbody>
            <caption>Service informations</caption>
        </table>
    </div>
    <div class="notFound mt-5">
        <p>{{ notMatchMessage }}</p>
    </div>
    

</template>


<style>

p{ font-size: 1.5rem; }

.input-search{ max-width: 400px; margin: auto; }

.search{ text-transform: uppercase; }

.search::placeholder{ text-transform: none; }

.notFound{
    font-size: 2rem;
    max-width:500px;
    color: gray;
    margin:auto;
    text-align: center;
}

</style>