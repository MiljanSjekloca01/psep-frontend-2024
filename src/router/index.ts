import { createRouter, createWebHistory } from 'vue-router'
import HomeView  from '../views/HomeView.vue'
import TypeView from '../views/types/TypeView.vue'
import EditType from '../views/types/EditType.vue'
import NewType from '@/views/types/NewType.vue'
import StateView from "../views/states/StateView.vue"
import EditState from '@/views/states/EditState.vue'
import NewState from '@/views/states/NewState.vue'
import ManufacturerView from "../views/manufacturer/ManufacturerView.vue"
import EditManufacturer from '@/views/manufacturer/EditManufacturer.vue'
import NewManufacturer from '@/views/manufacturer/NewManufacturer.vue'
import CustomersView from '@/views/customers/CustomersView.vue'
import EditCustomer from '@/views/customers/EditCustomer.vue'
import NewCustomer from '@/views/customers/NewCustomer.vue'
import ModelView from "@/views/model-view/ModelView.vue"
import EditModel from "@/views/model-view/EditModel.vue"
import NewModel from "@/views/model-view/NewModel.vue"



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    //Type
    { path: '/type', name: 'type', component: TypeView },
    { path: '/type/:id', name: 'edit-type', component: EditType },
    { path: '/type/new', name: 'new-type', component: NewType },
    //State
    { path: '/state', name: 'state', component: StateView },
    { path: '/state/:id', name: 'edit-state', component: EditState },
    { path: '/state/new', name: 'new-state', component: NewState },
    //Manufacturer 
    { path: '/manufacturer', name: 'manufacturer', component: ManufacturerView },
    { path: '/manufacturer/:id', name: 'edit-manufacturer', component: EditManufacturer },
    { path: '/manufacturer/new', name: 'new-manufacturer', component: NewManufacturer },  
     //Customer 
     { path: '/customer', name: 'customer', component: CustomersView },
     { path: '/customer/:id', name: 'edit-customer', component: EditCustomer },
     { path: '/customer/new', name: 'new-customer', component: NewCustomer },
     //Model 
     { path: '/model', name: 'model', component: ModelView },
     { path: '/model/:id', name: 'edit-model', component: EditModel },
     { path: '/model/new', name: 'new-model', component: NewModel },  

  ]
})

export default router
