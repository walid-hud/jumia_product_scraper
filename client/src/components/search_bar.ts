import gsap from "gsap";
import $ from "../utils/selector";
const input = $<HTMLInputElement>("#search-input")
const form = $<HTMLFormElement>("form");

const search = {
    disable():void{
        input.blur()
        input.disabled = true
        form.style.opacity = "0.5"
    },
    enable(){
        input.disabled = false
        form.style.opacity = "1"
    },
    animate(on_complete?:()=>void):void{
        gsap.to(form, {
        transform: "translateY(0)",
        margin: 0,
        top: 0,
        delay: 0.2,
        ease: "power2",
        duration: 0.8,
        onComplete: on_complete
    })},
    clear():void{
        input.value = ""
    }
    ,
    on_submit(cb:(ev:SubmitEvent)=>void):void{
        form.addEventListener("submit" , cb)
    }

}
export default search