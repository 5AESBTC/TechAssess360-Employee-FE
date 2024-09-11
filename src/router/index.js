import HomePage from '@/components/HomePage.vue';
import ProfilePage from '@/components/ProfilePage.vue';
import ResultPage from '@/components/ResultPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: HomePage },
    { path: '/profile', component: ProfilePage },
    { path: '/rate-result', component: ResultPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
