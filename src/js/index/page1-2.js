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


            // let {songs}=data
            // let number=0
            // songs.map((song)=>{
            //     number+=1
            //     let $a=$(this.template
            //     .replace('{{number}}',number)
            //     .replace('{{song.name}}',song.name)
            //     .replace('{{song.singer}}',song.singer)
            //     .replace('{{song.id}}',song.id))
            //     this.$el.append($a)
            // })
            // let children=this.$el.children()
            // for(let i=0;i<3;i++){
            //     $(children[i]).find('.sort').css('color','red')
            // }

            
            
        }
    }

    let model={
        data:{
            songs:[]
        },
        find(id){
            var playlist = AV.Object.createWithoutData('Playlist', id);
            var song = new AV.Query('Songs');
            song.equalTo('dependent',playlist);
            return song.find().then((songs)=>{
                // console.log(songs)
                this.data.songs=songs.map((song)=>{
                    return Object.assign({id:song.id},song.attributes)

                    // return {id:song.id,...song.attributes}
                })
                return songs
            });


        }
    }

    let controller={
        init(view,model){
            this.view=view
            this.view.init()
            this.model=model
            let id="5bc9fb429f54540070a84930"
            this.model.find(id).then(()=>{
                this.view.render(this.model.data)
            })
        },
    }

    controller.init(view,model)
    
}
////