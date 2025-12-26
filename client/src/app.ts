import search from "./components/search_bar"
import { render_skeletons,remove_skeletons } from "./components/skeleton"
import { show_container ,results_container } from "./components/results_container"
import { state,subscribe } from "./context"

subscribe("loading" , ()=>{
    if(state.loading) render_skeletons(results_container)
})

async function submit_handler(ev:SubmitEvent){
    ev.preventDefault()
    search.animate(show_container)
    state.loading = true
    
}

search.on_submit(submit_handler)