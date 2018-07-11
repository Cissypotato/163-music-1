{
    let view={
        el:'#app',
        render(data){
            let {song,status}=data
            $(this.el).css('background-image',`url(${song.cover})`)
            $(this.el).find('.discCover').css('background-image',`url(${song.cover})`)
            if($(this.el).find('audio').attr('src')!==song.url){
                $(this.el).find('audio').attr('src',song.url)
            }
            
            if(status==='playing'){
                this.play()
            }else{
                this.puased()
            }
        },
        play(){
            $(this.el).find('audio')[0].play()
            $(this.el).find('.disc').addClass('playing')
            $(this.el).find('.playBtn').removeClass('paused')
            $(this.el).find('.puaseBtn').removeClass('playing')
            
        },
        puased(){
            $(this.el).find('audio')[0].pause()
            $(this.el).find('.disc').removeClass('playing')
            $(this.el).find('.playBtn').addClass('paused')
            $(this.el).find('.puaseBtn').addClass('playing')
            
        },

    }
    let model={
        data:{
            song:{
                id:'',
                singer:'',
                name:'',
                url:'',
                cover:''
            },
            status:'paused'
            
        },
        get(id){
            var query = new AV.Query('Song');
            return query.get(id).then((song )=> {
                Object.assign(this.data.song,{id:id,...song.attributes})
                return song
            })
        },
    }


    let controller={
        init(view,model){
            this.view=view
            this.model=model
            let id=this.getSongId()
            this.model.get(id).then(()=>{
                this.view.render(this.model.data)
                // this.view.play()
                
            })
            this.bindEvents()
        },
        bindEvents(){
            
            $(this.view.el).on('click','.playBtn',()=>{
                this.model.data.status='playing'
                this.view.render(this.model.data)
                this.view.play()
            })
            $(this.view.el).on('click','.puaseBtn',()=>{
                this.model.data.status='puased'
                this.view.render(this.model.data)
                this.view.puased()
            })
            // let page =document.querySelector('.songPage')
            // let playBtn=document.querySelector('.playBtn')
            // $(playBtn).on('click',(e)=>{
            //     e.stopPropagation()
            //     this.view.play()
            //     console.log('paly')
            // })

        
            // $(page).on('click',(e)=>{
            //     e.stopPropagation()
            //     this.view.paused()
            //     console.log('paused')
            // })
            // console.log(3)


        },
        getSongId(){
            let search=window.location.search
            if(search.indexOf("?")===0){
                search=search.substring(1)
            }
            let array=search.split('&').filter((v=>v))
            let id=""
            for(let i=0;i<array.length;i++){
                let kv=array[i].split('=')
                let k=kv[0]
                let v=kv[1]
                if(k==='id'){
                    id=v
                    break
                }
            }
            return id
            
        }
    }


    controller.init(view,model)
    

}