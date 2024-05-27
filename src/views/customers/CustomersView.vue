<script setup lang="ts">
import { ref } from "vue";
import { formatDate } from "../../services/main.service";
import type { CustomerModel } from "../../models/customer.model";
import { CustomerService } from "../../services/customer.service";


const customers = ref<CustomerModel[]>()
CustomerService.getAllCustomers().then(rsp => {
    customers.value = rsp.data
})

async function removeThisCustomer(id: number){
    await CustomerService.deleteCustomerById(id).then(rsp => {
        customers.value = customers.value?.filter(c => c.customerId !== id )
    }) 

}


</script>

<template>

<div v-if="customers && customers.length > 0">   
    <h1 class="h3">Customers</h1>
    <table class="table text-center">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">Tax id</th>
        <th scope="col">Created at</th>
        <th scope="col">Updated at</th>
        <th scope="col">Options</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="c in customers">
        <th scope="row">{{ c.customerId }}</th>
        <td>{{ c.name }}</td>
        <td>{{ c.email }}</td>
        <td>{{ c.phone }}</td>
        <td>{{ c.taxId ? c.taxId : "N/A" }}</td>
        <td>{{ formatDate(c.createdAt) }}</td>
        <td>{{ formatDate(c.updatedAt) }}</td>
        <td>
            <div class="btn-group">
                <RouterLink class="btn btn-sm btn-secondary m-1"
                    :to="`/customer/${c.customerId}`">
                    <i class="fa-solid fa-pencil"></i>
                </RouterLink>
                
                <RouterLink class="btn btn-sm btn-primary m-1" 
                    :to="`/customer/${c.customerId}/device`">
                    <i class="fa-solid fa-plug"></i>
                </RouterLink>

                <button type="button" class="btn btn-sm btn-danger m-1"
                    @click="removeThisCustomer(c.customerId)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
        </tr>
        </tbody>
    </table>
    <RouterLink class="btn btn-md btn-success" to="/customer/new">
        <i class="fa-solid fa-circle-plus"></i>
        Add New Customer
    </RouterLink>
</div> 

<div v-else-if="customers?.length == 0">
    <div class="mb-3">Create a new customer</div>    
    <RouterLink class="btn btn-md btn-success" to="/customer/new">
        <i class="fa-solid fa-circle-plus"></i>
        Add New Customer
    </RouterLink>
</div>

<div v-else>Customers are being loaded... Please wait</div>

</template>