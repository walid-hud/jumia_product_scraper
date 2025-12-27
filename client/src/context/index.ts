import type {JUMIA_PRODUCT} from "@shared/types"
type State = {
    current_page:number,
    loading:boolean,
    products:JUMIA_PRODUCT[]
}
type Subscriber = ()=>void

const initial_state :State = {
    loading:false,
    products:[],
    current_page:1
}

const create_store = <T extends object>(initial:T)=>{
    const subscribers = new Map<keyof T , Set<Subscriber>>();
    function subscribe(key:keyof T , fn:Subscriber){
        if(!subscribers.has(key)){
            subscribers.set(key, new Set())
        }
        subscribers.get(key)!.add(fn)

        return () => subscribers.get(key)!.delete(fn);
    }
    const state = new Proxy(initial , {
        set(target , prop, value ){
            if (typeof prop !== "string") return true; 
            if (!(prop in target)) return true; // prop doesn't exist on target
            const key = prop as keyof T; // narrowing the type of prop to be a key of the initial state object (T)
            // if(target[key]===value) return true //nothing changed
            target[key] = value;
            subscribers.get(key)?.forEach(fn => fn());
            return true;
        }
    })
    return {state , subscribe}

}

export const store = create_store(initial_state)
export const state = store.state
export const subscribe = store.subscribe