import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import TeamMatesAssess from '@/components/TeamMatesAssess.vue';
import ProfilePage from '@/components/ProfilePage.vue';
import AssessResult from '@/components/AssessResult.vue';
import Personal from '@/components/PersonalAssess.vue';
import Login from '@/components/Login.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/personal-assess', component: Personal },
    { path: '/teammates-assess', component: TeamMatesAssess },
    { path: '/profile', component: ProfilePage },
    { path: '/assess-result', component: AssessResult },
    { path: '/login', component: Login, meta: { hideHeader: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
