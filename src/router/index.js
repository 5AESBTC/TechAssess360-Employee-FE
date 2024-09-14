import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import AssessPage from '@/components/AssessPage.vue';
import ProfilePage from '@/components/ProfilePage.vue';
import AssessResult from '@/components/AssessResult.vue';
import TeamManage from '@/components/TeamManage.vue';
import Login from '@/components/Login.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/assess-page', component: AssessPage },
    { path: '/profile', component: ProfilePage },
    { path: '/assess-result', component: AssessResult },
    { path: '/team-manage', component: TeamManage },
    { path: '/login', component: Login, meta: { hideHeader: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
