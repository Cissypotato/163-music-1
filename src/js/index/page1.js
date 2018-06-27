{
    let view={
        el:"#page-1",
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
            this.loadMoudle1()
            this.loadMoudle2()
        },
        bindEventHub(){
            window.eventHub.on('selectedTab',(tagName)=>{
                if(tagName==='page-1'){
                    this.view.show()
                }else{
                    this.view.hidden()
                }
            })
        },
        loadMoudle1(){
            let script1=document.createElement('script')
            script1.src="js/index/page1-1.js"
            script1.onload=function(){
                console.log('模块1加载完毕')
            }
            document.body.appendChild(script1)
        },
        loadMoudle2(){
            let script2=document.createElement('script')
            script2.src="js/index/page1-2.js"
            script2.onload=function(){
                console.log('模块2加载完毕')
            }
            document.body.appendChild(script2)
        },

    }
    controller.init(view,model)
}