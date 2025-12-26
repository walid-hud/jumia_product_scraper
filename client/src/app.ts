import search from "./components/search_bar"
import { render_skeletons,remove_skeletons } from "./components/skeleton"
import { show_container ,results_container } from "./components/results_container"
import { state,subscribe } from "./context"

subscribe("loading" , ()=>{
    state.loading ? render_skeletons(results_container) : remove_skeletons(results_container)
})

const sleep = (ms:number)=>{
    return new Promise((r)=>setTimeout(r,ms))
}

async function submit_handler(ev:SubmitEvent){
    ev.preventDefault()
    search.disable()
    search.animate(show_container)
    state.loading = true
    await sleep(4000)
    state.loading = false
    search.enable()
}

search.on_submit(submit_handler)