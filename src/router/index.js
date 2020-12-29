import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/programs",
        name: "Programs",
        component: () =>
            import(/* webpackChunkName: "programs" */ "../views/Programs.vue")
    },
    {
        path: "/creations",
        name: "Creations",
        component: () =>
            import(/* webpackChunkName: "creations" */ "../views/Creations.vue")
    },
    {
        path: "/blog",
        name: "Blog",
        component: () =>
            import(/* webpackChunkName: "blogfeed" */ "../views/blog/Feed.vue")
    },
    {
        path: "/blog/posts/:post",
        name: "Post",
        component: () =>
            import(/* webpackChuckName: "blogpost" */ "../views/blog/Post.vue")
    },
    {
        path: "/blog/category/:category",
        name: "Category",
        component: () =>
            import(
                /* webpackChuckName: "blogcategory" */ "../views/blog/Category.vue"
            )
    },
    {
        path: "/notfound",
        name: "NotFound",
        component: () =>
            import(/* webpackChuckName: "notfound" */ "../views/NotFound.vue")
    },
    {
        path: "*",
        redirect: from => ({
            name: "NotFound",
            query: { path: window.location.origin + from.path }
        })
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
