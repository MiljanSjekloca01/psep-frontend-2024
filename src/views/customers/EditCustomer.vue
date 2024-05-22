<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatDate } from '@/services/main.service';
import type { CustomerModel } from '@/models/customer.model';
import { CustomerService } from '@/services/customer.service';

const route = useRoute()
const router = useRouter();
const id = Number.parseInt(route.params.id as any)
const customer = ref<CustomerModel>()
var oldCustomerData: CustomerModel;
CustomerService.getCustomerById(id).then(rsp => {
    customer.value = rsp.data
    oldCustomerData = { ...rsp.data };
})

async function updateEditedCustomer(customer: CustomerModel){
    await CustomerService.updateCustomerById(id,customer).then(rsp => {
        router.push({ path: "./"})
    })
}


function validationCheck(customer: CustomerModel) {
    const { name, phone, email,taxId} = customer;
    
    const isInvalidName = name === '' || name.length < 2;
    const isInvalidPhone = phone === '' || phone.length < 8;
    const isInvalidEmail = email === '' || email.length < 8;
    
    if(taxId !== null){
        let stringTaxId = taxId.toString()
        if(stringTaxId === '' || stringTaxId.length < 4){
            return true
        };
    }

    const isUnedited = (
        name === oldCustomerData.name &&
        phone === oldCustomerData.phone &&
        email === oldCustomerData.email &&
        taxId === oldCustomerData.taxId
    )

    return isInvalidName || isInvalidPhone || isInvalidEmail || isUnedited;
}

</script>

<template>
    <div v-if="customer">
        <h1 class="h3">Edit Customer</h1>
        <form>
            <div class="mb-3">
                <label for="id" class="form-label">ID</label>
                <input type="number" class="form-control" id="id" disabled :value="customer.customerId">
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="customer.name">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="customer.email">
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input type="text" class="form-control" id="phone" v-model="customer.phone">
            </div>
            <div class="mb-3" v-if="customer.taxId">
                <label for="taxId" class="form-label">TaxId</label>
                <input type="number" class="form-control" id="taxId" v-model="customer.taxId">
            </div>
            <div class="mb-3">
                <label for="createdAt" class="form-label">Created At:</label>
                <input type="text" class="form-control" id="createdAt" disabled :value="formatDate(customer.createdAt)">
            </div>
            <div class="mb-3">
                <label for="updatedAt" class="form-label">Last Updated At:</label>
                <input type="text" class="form-control" id="updatedAt" disabled :value="formatDate(customer.updatedAt)">
            </div>
        </form>
        <RouterLink class="btn btn-md btn-secondary" to="./">
        <i class="fa-solid fa-rotate-left"></i> 
        Return</RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
        @click="updateEditedCustomer(customer)" :disabled="validationCheck(customer)">
        <i class="fa-solid fa-download"></i>
        Save</button>
    </div>
</template>