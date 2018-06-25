
window.eventHub={
    events:{},
    emit(eventName,data){
        for(let key in this.events){
            if(key ===eventName){
                let fnLsit=this.events[key]
                fnLsit.map((fn)=>{
                    fn.call(undefined,data)
                })
            }
        }
    },
    on(eventName,fn){
        if(this.events[eventName]===undefined){
            this.events[eventName]=[]
        }
        this.events[eventName].push(fn)
    }
}