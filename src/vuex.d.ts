import { Store } from "vuex";
import { Post, Tag } from "./models/blog";
import { Program } from "./models/programs";

declare module "@vue/runtime-core" {
    // declare your own store states
    interface State {
        creations: null | object;
        posts: null | Post[];
        tags: null | Tag[];
        programs: Program[];
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
