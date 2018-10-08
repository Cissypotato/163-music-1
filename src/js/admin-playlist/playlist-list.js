{
    let view={
        el:".playLists-container",
        template:`
            <ul class="playLists">
            </ul>
        `,
        render(data){
            let $el=$(this.el)
            $el.html(this.template)
            let{playlists,selectedPlaylistId}=data
            let liList=playlists.map((playlist)=>{

                let $li=$("<li></li>").text(playlist.name).attr('data-playlist-id',playlist.id)
                if(playlist.id===selectedPlaylistId){$li.addClass('active')}
                return $li
            })
            console.log(liList)
            
            $el.find('ul').empty()
            liList.map((domLi=>{
                $el.find('ul').append(domLi)
            }))
        },
        
        clearActive(){
            $(this.el).find('.active').removeClass('active')
        }
    }



    let model={
        data:{
            playlists:[],
            selectedPlaylistId:null
        },
        find(){
            var query = new AV.Query('Playlist');
            console.log(query)
            return query.find().then((playlists)=> {
                console.log(playlists)
                this.data.playlists=playlists.map((playlist)=>{
                    return {id:playlist.id,...playlist.attributes}
                })
                return playlists
            })
            console.log(233)
        }
    }



    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            this.getAllPlaylists()
            this.bindEvents()
            this.bindEventHub()
               
        },
        getAllPlaylists(){
            return this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
        },
        bindEvents(){
            $(this.view.el).on('click','li',(e)=>{
                let playlistId=e.currentTarget.getAttribute('data-playlist-id')
                this.model.data.selectedPlaylistId=playlistId
                this.view.render(this.model.data)

                let data
                let playlists=this.model.data.playlists
               
                for(let i=0;i<playlists.length;i++){
                    if(playlists[i].id===playlistId){
                        data=playlists[i]
                        break
                    }
                }
                
                let string=JSON.stringify(data)
                let object=JSON.parse(string)
               
                window.eventHub.emit('select',object)
            })
        },
        bindEventHub(){
            window.eventHub.on('create',(playlistData)=>{
                this.model.data.playlists.push(playlistData);
                this.view.render(this.model.data)

            })
            window.eventHub.on('new',()=>{
                this.view.clearActive()
            })
            window.eventHub.on('update',(playlist)=>{
                let playlists=this.model.data.playlists
                for(i=0;i<playlists.length;i++){
                    if(playlists[i].id===playlist.id){
                        Object.assign(playlists[i],playlist)
                    }
                }
                this.view.render(this.model.data)
            })
        },
    }
    controller.init(view,model)
}