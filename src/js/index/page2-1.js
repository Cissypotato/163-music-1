{
    let view={
        el:'.hotSongList',
        template:`
        <a class="songRaw" href="song.html?id={{song.id}}">
            <div class="sort">{{number}}</div>
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
            let number=0
            songs.map((song)=>{
                number+=1
                let $a=$(this.template
                .replace('{{number}}',number)
                .replace('{{song.name}}',song.name)
                .replace('{{song.singer}}',song.singer)
                .replace('{{song.id}}',song.id))
                this.$el.append($a)
            })
            let children=this.$el.children()
            for(let i=0;i<3;i++){
                $(children[i]).find('.sort').css('color','red')
            }

            
            
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
                console.log(songs)
                this.data.songs=songs.map((song)=>{
                    return {id:song.id,...song.attributes}
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
            let id="5bc995720b6160006a14bca9"
            this.model.find(id).then(()=>{
                this.view.render(this.model.data)
            })
        },
    }

    controller.init(view,model)
}


////
    // var GuangZhou = new AV.Object('City');// 广州
    // GuangZhou.set('name', '广州');
    // var GuangDong = new AV.Object('Province');// 广东
    // GuangDong.set('name', '广东');
    // GuangZhou.set('dependent', GuangDong);// 为广州设置 dependent 属性为广东
    // GuangZhou.save().then(function (guangZhou) {
    //     console.log(guangZhou.id);
    // });


    // var playlist = AV.Object.createWithoutData('Playlist', '5bba3c559f54540070db1b2a');
    // var query = new AV.Query('Songs');
    // query.equalTo('dependent', playlist);
    // query.find().then(function (cities) {
    //     cities.forEach(function (city, i, a) {
    //         console.log(city.id);
    //     });
    // })