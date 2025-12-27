import $ from "../utils/selector";

const results_section = $<HTMLElement>(".results-section");
function swap_section(new_section:HTMLElement){
    clear_section();
    results_section.appendChild(new_section);
}
function clear_section(){results_section.innerHTML=""}
function insert_section(new_section:HTMLElement){
    results_section.appendChild(new_section);
}

export  {
    swap_section,
    clear_section,
    insert_section};