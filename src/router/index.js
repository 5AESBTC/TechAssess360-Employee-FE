import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import AssessPage from '@/components/AssessPage.vue';
import ProfilePage from '@/components/ProfilePage.vue';
import AssessResult from '@/components/AssessResult.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/assess-page', component: AssessPage },
    { path: '/profile', component: ProfilePage },
    { path: '/assess-result', component: AssessResult }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
