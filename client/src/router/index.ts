import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Wrapper from '../pages/Wrapper.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import Users from '../pages/users/Users.vue'
import UserCreate from '../pages/users/UserCreate.vue'
import UserEdit from '../pages/users/UserEdit.vue'
import Roles from '../pages/roles/Roles.vue'
import RoleCreate from '../pages/roles/RoleCreate.vue'
import RoleEdit from '../pages/roles/RoleEdit.vue'
import Documents from '../pages/documents/Documents.vue'
import DocumentCreate from '../pages/documents/DocumentCreate.vue'
import DocumentEdit from '../pages/documents/DocumentEdit.vue'
import Transactions from '../pages/transactions/Transactions.vue'
import TransactionCreate from '../pages/transactions/TransactionCreate.vue'
import TransactionEdit from '../pages/transactions/TransactionEdit.vue'
import Residents from '../pages/residents/Residents.vue'
import ResidentCreate from '../pages/residents/ResidentCreate.vue'
import ResidentEdit from '../pages/residents/ResidentEdit.vue'
import Reports from '../pages/reports/Reports.vue'


const routes: Array<RouteRecordRaw> = [
    { path: '/register', component: Register },
    { path: '/login', component: Login },

    { path: '/', component: Wrapper, children: [
        { path: '', component: Dashboard },
        { path: '/users', component: Users },
        { path: '/users/create', component: UserCreate },
        { path: '/users/:id/edit', component: UserEdit },
        { path: '/roles', component: Roles },
        { path: '/roles/create', component: RoleCreate },
        { path: '/roles/:id/edit', component: RoleEdit },
        { path: '/documents', component: Documents },
        { path: '/documents/create', component: DocumentCreate },
        { path: '/documents/:id/edit', component: DocumentEdit },
        { path: '/residents', component: Residents },
        { path: '/residents/create', component: ResidentCreate },
        { path: '/residents/:id/edit', component: ResidentEdit },
        { path: '/transactions', component: Transactions },
        { path: '/transactions/create', component: TransactionCreate },
        { path: '/transactions/:id/edit', component: TransactionEdit },
        { path: '/reports', component: Reports },
    ]}
    
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router