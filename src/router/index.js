import {createRouter, createWebHistory} from 'vue-router';
import HomePageUser from "@/components/HomePageUser.vue";

const routes = [
    {path: '/homePageUser', component: HomePageUser}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
