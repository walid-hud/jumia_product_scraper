import $ from "../utils/selector";
import gsap from "gsap";
import { state, subscribe } from "../context/index";
import generate_product_card from "./product_card";
const results_container = $<HTMLElement>(".results-container");
function show_container(on_complete?:()=>void) {
    gsap.to(results_container, {
        opacity: 1,
        ease: "power1.inOut",
        duration: 0.4,
        onComplete:on_complete
    });
}
subscribe("products" ,render)
function render(){
    if(state.products.length===0){
        // add a products or 404 screen later
        return
    }
    state.products.map(prd => {
        results_container.append(generate_product_card(prd))
    })
}
export {results_container,show_container}
