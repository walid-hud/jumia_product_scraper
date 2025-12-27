const start_observer = (
    on_observed: () => Promise<void>,
    config: IntersectionObserverInit
): IntersectionObserver => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(async (e)=>{
            if(e.isIntersecting) await on_observed()
        })
    }, config);
    return observer;
};

export {start_observer}