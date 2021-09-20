import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Creations from "../views/Creations.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/creations",
        name: "Creations",
        component: Creations,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
