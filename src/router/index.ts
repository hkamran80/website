import { createWebHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue";
import Creations from "../views/Creations.vue";
import Creation from "../views/Creation.vue";
import BlogPosts from "../views/BlogPosts.vue";
import BlogTag from "../views/BlogTag.vue";
import BlogPost from "../views/BlogPost.vue";
import Notes from "../views/Notes.vue";
import NotesTag from "../views/NotesTag.vue";
import Note from "../views/Note.vue";
import Programs from "../views/Programs.vue";
import Program from "../views/Program.vue";
import Legal from "../views/Legal.vue";
import License from "../views/License.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import Error404 from "../views/404.vue";

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
    {
        path: "/creations/music-analyzer",
        redirect: () => {
            return { path: "/creations/acoustats" };
        },
    },
    {
        path: "/creations/:id",
        name: "Creation",
        component: Creation,
    },
    {
        path: "/blog",
        name: "BlogPosts",
        component: BlogPosts,
    },
    {
        path: "/blog/tag/:slug",
        name: "BlogTag",
        component: BlogTag,
    },
    {
        path: "/blog/post/:slug",
        name: "BlogPost",
        component: BlogPost,
    },
    {
        path: "/notes",
        name: "Notes",
        component: Notes,
    },
    {
        path: "/notes/tag/:slug",
        name: "NotesTag",
        component: NotesTag,
    },
    {
        path: "/notes/note/:slug",
        name: "Note",
        component: Note,
    },
    {
        path: "/programs",
        name: "Programs",
        component: Programs,
    },
    {
        path: "/programs/:id",
        name: "Program",
        component: Program,
    },
    {
        path: "/license",
        redirect: () => {
            return { path: "/legal/license" };
        },
    },
    { path: "/legal", name: "Legal", component: Legal },
    {
        path: "/legal/license",
        name: "License",
        component: License,
    },
    {
        path: "/legal/privacy",
        name: "PrivacyPolicy",
        component: PrivacyPolicy,
    },
    { path: "/:pathMatch(.*)*", name: "404", component: Error404 },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, _, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: "smooth",
            };
        } else if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

export default router;
