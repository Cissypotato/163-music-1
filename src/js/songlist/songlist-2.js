{
    let view={
        el:'.introPart',
        render(data){
            
            let {playlist}=data
            // $(this.el).css({backgroundImage:`url(${playlist.cover})`})
            let string=playlist.tag
            
            let array=string.split(' ')
            console.log(array)
            for(let i=0;i<array.length;i++){
                $(this.el).find('.listTag').append(`<span>${array[i]}</span>`)
            }
            $(this.el).find('.listSummary').html(`简介：${playlist.summary}`)

            
            // $(this.el).find('.discCover').css('background-image',`url(${playlist.cover})`)
            // $(this.el).find('.lyricsWrap>h3').text(playlist.name)
            // if($(this.el).find('audio').attr('src')!==playlist.url){
            //     let audio=$(this.el).find('audio').attr('src',playlist.url)
            //     audio.on('ended',()=>{
            //         this.puased()
            //     })
            //     let audio1=$(this.el).find('audio').attr('src',playlist.url).get(0)
            //     audio1.ontimeupdate=()=>{
            //        this.showlyrics(audio1.currentTime)
            //     }

            // }
            
            
        },

    }
    let model={
        data:{
            playlist:{
                id:'',
                tag:'',
                summary:'',    
            },
            
        },
        get(id){
            
            var query = new AV.Query('Playlist');
            return query.get(id).then((playlist )=> {
                this.data.playlist.id=id
                Object.assign(this.data.playlist,playlist.attributes)
                return playlist
            })
        },
    }


    let controller={
        init(view,model){
            this.view=view
            this.model=model
            let id=this.getPlaylistId()
            this.model.get(id).then(()=>{

                this.view.render(this.model.data)
                // this.view.play()
                
            })

        },
        getPlaylistId(){
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