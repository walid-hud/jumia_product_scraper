import $ from "../utils/selector";

const results_section = $<HTMLElement>(".results-section");
function swap(new_section:HTMLElement){
    clear();
    results_section.appendChild(new_section);
}
function clear(){results_section.innerHTML=""}
function insert(new_section:HTMLElement){
    results_section.appendChild(new_section);
}

export default {swap,clear,insert};