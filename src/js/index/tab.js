{
    let view={
        el:"#tabs",
        init(){
            this.$el=$(this.el)
        },
    }
    let model={}
    let controller={
        init(view,model){
            this.view=view
            this.view.init()
            this.model=model
            this.bindEvents()
        },
        bindEvents(){
            this.view.$el.on('click',"ul>li",(e)=>{
               let $li=$(e.currentTarget)
               let pageName=$li.attr('data-tab-name')
               console.log(pageName)
                $($li.children()).addClass('active')
                $($li.siblings().children()).removeClass('active')
                window.eventHub.emit('selectedTab',pageName)
                
            })
        }
    }

    controller.init(view,model)
    
}