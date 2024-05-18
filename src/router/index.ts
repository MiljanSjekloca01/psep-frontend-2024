import { createRouter, createWebHistory } from 'vue-router'
import HomeView  from '../views/HomeView.vue'
import TypeView from '../views/types/TypeView.vue'
import EditType from '../views/types/EditType.vue'
import NewType from '@/views/types/NewType.vue'
import StateView from "../views/states/StateView.vue"
import EditState from '@/views/states/EditState.vue'
import NewState from '@/views/states/NewState.vue'

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
  
  
  ]
})

export default router
