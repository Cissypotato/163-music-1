{
    
    let view={
        el:'section.remdPlaylist',
        template:`
        <a href="songList.html?id={{playlist.id}}">
            <div class="playlistCover">
                <img  alt="">
                <p>
                    <svg class="icon headset" aria-hidden="true">
                        <use xlink:href="#icon-1"></use>
                    </svg>
                    {{playlist.number}}万
                </p>                           
            </div>
            <p>{{playlist.name}}</p>
        </a>
            
        `,
        init(){
            this.$el=$(this.el)
        },
        render(data){
            let {playlists}= data
            playlists.map((playlist)=>{
                let $a=$(this.template
                .replace('{{playlist.name}}',playlist.name)
                .replace('{{playlist.id}}',playlist.id)
                .replace('{{playlist.number}}',playlist.number))
                
                $a.find('.playlistCover>img').css({'background':`url(${playlist.cover})`,"background-size":"100%"})
                console.log(playlist.cover)
                // $a.find('.playlistCover>img').attr("src:"+playlist.cover)
                this.$el.find('.playlists').append($a)
            })
           
        }
    }

    let model={
        data:{
            playlists:[]
        },
        find(){
           
            var query = new AV.Query('Playlist');
            return query.find().then( (playlists)=> {
                this.data.playlists=playlists.map((playlist)=>{
                    // return Object.assign({id:song.id},song.attributes)
                    return {id:playlist.id,...playlist.attributes}
                })
                return playlists
            })
        }

    }

    let controller={
        init(view,model){
            
            this.view=view
            this.view.init()
            this.model=model
            
            this.model.find().then(()=>{
                console.log(3)
                this.view.render(this.model.data)
            })
            this.bindEvents()
            console.log(5)
        },
        bindEvents(){},

    }

    controller.init(view,model)
}