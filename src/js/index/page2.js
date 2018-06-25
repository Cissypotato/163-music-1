{
    let view={
        el:"#page-2",
        init(){
            this.$el=$(this.el)
        },
        show(){
            this.$el.addClass('active')
        },
        hidden(){
            this.$el.removeClass('active')
        }

    }
    let model={}
    let controller={
        init(view,model){
            this.view=view
            this.view.init()
            this.model=model
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on('selectedTab',(tagName)=>{
                if(tagName==='page-2'){
                    this.view.show()
                }else{
                    this.view.hidden()
                }
            })
        }
    }
    controller.init(view,model)
}