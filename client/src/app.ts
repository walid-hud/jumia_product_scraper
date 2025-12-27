import search from "./components/search_bar";
import { render_skeletons, remove_skeletons } from "./components/skeleton";
import {
    show_container,
    results_container,
} from "./components/results_container";
import { state, subscribe } from "./context";
import "./utils/scroll_index";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { fetch_products } from "./services/api";
import type { JUMIA_PRODUCT } from "@shared/types";

gsap.registerPlugin(ScrollTrigger);


subscribe("loading", () => {
    state.loading
        ? render_skeletons(results_container, 40)
        : remove_skeletons(results_container);
});

const sleep = (ms: number) => {
    return new Promise((r) => setTimeout(r, ms));
};

async function submit_handler(ev: SubmitEvent) {
    ev.preventDefault();
    search.animate(show_container);
    state.loading = true;
    search.disable();
    gsap.to(".scroll-indicator", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: results_container,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
        },
    });
    const query = search.get_value();
    const data = await fetch_products(query);
    console.log(data)
    state.loading = false;
    state.products = [...state.products, ...data.data as JUMIA_PRODUCT[]];    
    search.enable();
}

search.on_submit(submit_handler);
