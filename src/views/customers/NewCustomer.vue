<script setup lang="ts">
import { CustomerService } from '@/services/customer.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { CustomerModel } from '@/models/customer.model';

const router = useRouter()
const customer = ref<any>({
    name: "",
    email: "",
    phone: "",
    taxId: "",
})
    
async function onCreateCustomerClicked(customer: CustomerModel){
    if(customer.taxId == 0 || customer.taxId === undefined) customer.taxId = null;
    await CustomerService.createCustomer(customer).then(rsp => {
        router.push({ path: "./"})
    })
}


function validationCheck(customer: CustomerModel) {
    const { name, phone, email,taxId } = customer;
    const isInvalidName = name === '' || name.length < 2;
    const isInvalidPhone = phone === '' || phone.length < 8;
    const isInvalidEmail = email === '' || email.length < 8;

    return isInvalidName || isInvalidPhone || isInvalidEmail;
}
</script>

<template>
    <div>
        <h1 class="h3">Create Customer</h1>
        <form>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="customer.name" >
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="customer.email">
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input type="text" class="form-control" id="phone" v-model="customer.phone">
            </div>
            <div class="mb-3">
                <label for="taxId" class="form-label">TaxId</label>
                <input type="text" class="form-control" id="taxId" v-model="customer.taxId" required>
            </div>
           
        </form>
        <RouterLink class="btn btn-md btn-secondary" to="./">
        <i class="fa-solid fa-rotate-left"></i>
        Return</RouterLink>&nbsp;
        <button type="button" class="btn btn-md btn-success"
        @click="onCreateCustomerClicked(customer)" :disabled="validationCheck(customer)">
        <i class="fa-solid fa-download"></i>
        Create Customer</button>
    </div>
</template>