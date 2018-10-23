{
    let view={
        el:'#app',
        render(data){
            let {song,status}=data
            $(this.el).find('.songPageBg').css('background-image',`url(${song.cover})`)
            $(this.el).find('.discCover').css('background-image',`url(${song.cover})`)
            $(this.el).find('.lyricsWrap>h3').text(song.name)
            if($(this.el).find('audio').attr('src')!==song.url){
                let audio=$(this.el).find('audio').attr('src',song.url)
                audio.on('ended',()=>{
                    this.puased()
                })
                let audio1=$(this.el).find('audio').attr('src',song.url).get(0)
                audio1.ontimeupdate=()=>{
                   this.showlyrics(audio1.currentTime)
                }

            }
            
            if(status==='playing'){
                this.play()
            }else{
                this.puased()
            }
            let {lyrics}=song
            lyrics.split('\n').map((string)=>{
                let p =document.createElement('p')
                let regex=/\[([\d:.]+)\](.+)/
                let matches=string.match(regex)
                if (matches){
                    p.textContent=matches[2]
                    let time=matches[1]
                    let part=time.split(':')
                    let minutes=part[0]
                    let seconds=part[1]
                    let newTime=parseFloat(minutes,10)*60+parseFloat(seconds,10)
                    p.setAttribute('data-time',newTime)
                }else{
                    p.textContent=string
                }
                 
                $(this.el).find('.lyrics>.lines').append(p)
            })
            
        },
        showlyrics(time){
            let allP=$(this.el).find('.lyrics>.lines>p')
            for(let i=0;i<allP.length;i++){
                let p=allP[i]
                if(i===allP.length-1){
                    p=allP[i]
                    break
                }else{
                    let currentTime=allP.eq(i).attr('data-time')
                    let nextTime=allP.eq(i+1).attr('data-time')
                    if(currentTime<=time && time<=nextTime){
                        
                        let pHeight=p.getBoundingClientRect().top
                        let linesHeight=$(this.el).find('.lyrics>.lines')[0].getBoundingClientRect().top
                        let height=pHeight-linesHeight;
                        $(this.el).find('.lyrics>.lines').css({
                            'transform':`translateY(${-height+30}px)`
                        })
                        $(p).addClass('active').siblings('.active').removeClass('active')
                        break
                    }
                }
            }
        }
        ,
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
                cover:'',
                
            },
            status:'paused'
            
        },
        get(id){
            
            var query = new AV.Query('Songs');
            return query.get(id).then((song )=> {
                this.data.song.id=id
                Object.assign(this.data.song,song.attributes)
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