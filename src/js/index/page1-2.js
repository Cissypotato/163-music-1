{
    let view={
        el:'section.latestSongs',
        template:`
        <a class="songRaw" href="song.html?id={{song.id}}">
            <div class="songWrapper">
                <div class="songName">{{song.name}}</div>
                <div class="singer">
                    <svg class="icon sq" aria-hidden="true" >
                        <use xlink:href="#icon-sq"></use>
                    </svg>
                    {{song.singer}}
                </div>
            </div>
            <div class="playBtn">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-play"></use>
                    </svg>
            </div>
        </a>    
        
        `     ,
        init(){
            this.$el=$(this.el)
        },
        render(data){
            let {songs}=data
            songs.map((song)=>{
                let $a=$(this.template
                .replace('{{song.name}}',song.name)
                .replace('{{song.singer}}',song.singer)
                .replace('{{song.id}}',song.id))
                this.$el.find('.latestSongList').append($a)
            })
            
        }
    }
    let model={
        data:{
            songs:[]
        },
        find(){
            var query = new AV.Query('Song');
            return query.find().then( (songs)=> {
                this.data.songs=songs.map((song)=>{
                    // return Object.assign({id:song.id},song.attributes)
                    return {id:song.id,...song.attributes}
                })
                return songs
            })
        }
    }
    let controller={
        init(view,model){
            this.view=view
            this.view.init()
            this.model=model
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
            this.bindEvents()
        },
        bindEvents(){},

    }

    controller.init(view,model)
}
//