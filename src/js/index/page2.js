{
    let view={
        el:"#page-2",
        init(){
            this.$el=$(this.el)
            var date=new Date
            var month = date.getMonth() + 1; // 月
            var day  = date.getDate(); // 日
            this.$el.find('.hotSongsTittlePart>p>span').html( month + "月" + day + "日" )
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
            
        },
        bindEventHub(){
            window.eventHub.on('selectedTab',(tagName)=>{
                if(tagName==='page-2'){
                    this.view.show()
                }else{
                    this.view.hidden()
                }
            })
        },
        loadMoudle1(){
            let script1=document.createElement('script')
            script1.src="js/index/page2-1.js"
            script1.onload=function(){
                console.log('模块2-1加载完毕')
            }
            document.body.appendChild(script1)
        },
    }
    controller.init(view,model)
}