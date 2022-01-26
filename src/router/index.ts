import { createWebHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue"
import Creations from "../views/Creations.vue"
import Creation from "../views/Creation.vue"
import BlogPosts from "../views/BlogPosts.vue"
import BlogTag from "../views/BlogTag.vue"
import BlogPost from "../views/BlogPost.vue"
import Notes from "../views/Notes.vue"
import NotesTag from "../views/NotesTag.vue"
import Note from "../views/Note.vue"
import Programs from "../views/Programs.vue"
import Program from "../views/Program.vue"
import License from "../views/License.vue"

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
        name: "License",
        component: License,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
