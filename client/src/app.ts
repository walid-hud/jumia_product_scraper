import search from "./components/search_bar";
import { render_skeletons, remove_skeletons } from "./components/skeleton";
import {
    clear_section,
    insert_section,
    swap_section,
} from "./components/results_section";
import {
    show_container,
    results_container,
    clear_container,
} from "./components/results_container";
import { state, subscribe } from "./context";
import "./utils/scroll_index";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { fetch_products } from "./services/api";
import type { JUMIA_PRODUCT } from "@shared/types";
import { start_observer } from "./utils/observer";
import $ from "./utils/selector";
import error_screen from "./components/error_screen";

gsap.registerPlugin(ScrollTrigger);

subscribe("loading", () => {
    state.loading
        ? render_skeletons(results_container, 40)
        : remove_skeletons(results_container);
});

const sleep = (ms: number) => {
    return new Promise((r) => setTimeout(r, ms));
};

const observer = start_observer(load_on_scroll);
const results_container_end = $<HTMLElement>("#results-container-end");
async function submit_handler(ev: SubmitEvent) {
    observer.unobserve(results_container_end);
    observer.observe(results_container_end);
    ev.preventDefault();
    state.query = search.get_value();
    clear_container();
    search.animate(show_container);
    state.loading = true;
    search.disable();
    ScrollTrigger.refresh();
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
    const { data, error } = await fetch_products(state.query);
    state.loading = false;
    search.enable();
    if (error && error.status >= 500) {
        swap_section(error_screen(error));
        return;
    } else if(error) {
        swap_section(error_screen(error));
        return;
    }
    else{
        state.products = [...(data as JUMIA_PRODUCT[])];
    }
}
async function load_on_scroll() {
    if (state.loading) return;
    state.loading = true;
    search.disable();
    const { data, error } = await fetch_products(
        state.query,
        state.current_page++
    );
    state.loading = false
    if (error && error.status === 404) {
        results_container_end.style.opacity = "1"
        observer.disconnect()
    } else if(error) {
        swap_section(error_screen(error));
        return;
    }else{
        state.products = [...state.products, ...(data as JUMIA_PRODUCT[])];
    }
    ScrollTrigger.refresh(); // to refresh scrollTrigger after appending new products
    search.enable();
}

search.on_submit(submit_handler);
