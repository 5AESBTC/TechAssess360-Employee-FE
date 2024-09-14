import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import AssessPage from '@/components/AssessPage.vue';
import ProfilePage from '@/components/ProfilePage.vue';
import AssessResult from '@/components/AssessResult.vue';
import TeamManage from '@/components/TeamManage.vue';
import Login from '../components/Login.vue'

const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    { path: '/home-page', component: HomePage },
    { path: '/assess-page', component: AssessPage },
    { path: '/profile', component: ProfilePage },
    { path: '/assess-result', component: AssessResult },
    { path: '/team-manage', component: TeamManage }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
