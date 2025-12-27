import { subscribe , state} from "../context/index";
import $ from "../utils/selector";
import gsap from "gsap";
const results_container = $<HTMLElement>(".results-container");
import generate_product_card from "../components/product_card";
function show_container(on_complete?:()=>void) {
    gsap.to(results_container, {
        opacity: 1,
        ease: "power1.inOut",
        duration: 0.4,
        onComplete:on_complete
    });
}
function render(){
    state.products.map((prd) => {
        results_container.append(generate_product_card(prd));
    });
}

function clear_container(){
    results_container.innerHTML=""
}
function show_end(){
    $<HTMLElement>("#results-container-end").style.display= "flex"
}

subscribe("products", render)

export {results_container,show_container, clear_container , show_end}
