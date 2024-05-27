import { createRouter, createWebHistory } from 'vue-router'
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
import DeviceView from "@/views/device/DeviceView.vue"
import NewDevice from "@/views/device/NewDevice.vue"
import EditDevice from "@/views/device/EditDevice.vue"
import LoginView from "@/views/LoginView.vue"
import ServiceView from "@/views/service-view/ServiceView.vue"
import NewService from "@/views/service-view/NewService.vue"
import EditService from "@/views/service-view/EditService.vue"
import SearchView from "@/views/SearchView.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: "/customer"},
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
     //Device
     { path: "/customer/:id/device", name: "device", component: DeviceView },
     { path: "/customer/:id/device/new", name: "new-device", component: NewDevice },
     { path: "/customer/:id/device/:id", name: "edit-device", component: EditDevice },
     // Login 
     { path: "/login",name: "login", component: LoginView},
     // Service
     { path: "/customer/:customerId/device/:deviceId/service", name: "service", component: ServiceView },
     { path: "/customer/:customerId/device/:deviceId/service/new", name: "new-service", component: NewService },
     { path: "/customer/:customerId/device/:deviceId/service/:serviceId", name: "edit-service", component: EditService },
     // Search
     { path: "/search", name:"search", component: SearchView },
  ]
})

export default router
