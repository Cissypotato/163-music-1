{
    let view={
        el:'.introPart',
        render(data){
            
            let {playlist}=data
            // $(this.el).css({backgroundImage:`url(${playlist.cover})`})
            $(this.el).find('.songlistTittlec').css({backgroundImage:`url(${playlist.cover})`})
            $(this.el).find('.listCover').css({background:`url(${playlist.cover})`,backgroundSize:'cover'})
            $(this.el).find('.clicknumber').html(`${playlist.number}万`)
            $(this.el).find('.listTitle').html(playlist.name)

            
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
                cover:'',
                name:'',
                number:'',
                
            },
            
        },
        get(id){
            
            var query = new AV.Query('Playlist');
            return query.get(id).then((playlist )=> {
                
                Object.assign(this.data.playlist,{id:id,...playlist.attributes})
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