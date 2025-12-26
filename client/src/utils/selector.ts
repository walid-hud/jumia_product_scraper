const $ = <T extends Element>(selector:string)=>{
    return document.querySelector<T>(selector)!
}

export default $