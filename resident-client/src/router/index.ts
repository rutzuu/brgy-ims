import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Wrapper from '../pages/Wrapper.vue'
import Login from '../pages/Login.vue'
import Resident from '../pages/residents/Resident.vue'
import ResidentEdit from '../pages/residents/ResidentEdit.vue'
import ResidentRegister from '../pages/residents/ResidentRegister.vue'
import Help from '../pages/Help.vue'

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: Login },
    { path: '/help', component: Help },
    
    { path: '/', component: Wrapper, children: [
        { path: '/resident/:id', component: Resident },
        { path: '/residents/register/:id', component: ResidentRegister },
        { path: '/residents/:id/edit', component: ResidentEdit },
    ]}
    
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router