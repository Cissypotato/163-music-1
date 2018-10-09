// {
//     let view={
//         el:'section.llistPart',
//         template:`
//         <a class="songRaw" href="song.html?id={{song.id}}">
//             <div class="songWrapper">
//                 <div class="songName">{{song.name}}</div>
//                 <div class="singer">
//                     <svg class="icon sq" aria-hidden="true" >
//                         <use xlink:href="#icon-sq"></use>
//                     </svg>
//                     {{song.singer}}
//                 </div>
//             </div>
//             <div class="playBtn">
//                     <svg class="icon" aria-hidden="true">
//                         <use xlink:href="#icon-play"></use>
//                     </svg>
//             </div>
//         </a>    
        
//         `     ,
//         init(){
//             this.$el=$(this.el)
//         },
//         render(data){
//             let {songs}=data
//             songs.map((song)=>{
//                 let $a=$(this.template
//                 .replace('{{song.name}}',song.name)
//                 .replace('{{song.singer}}',song.singer)
//                 .replace('{{song.id}}',song.id))
//                 this.$el.find('.playSongList').append($a)
//             })
            
            
//         }
//     }

//     let model={
//         data:{
//             songs:[]
//         },
//         find(id){
//             var playlist = AV.Object.createWithoutData('Playlist', id);
//             console.log(playlist)
//             var song = new AV.Query('Song');
//             console.log(song)
//             song.equalTo('dependent',playlist);
//             return song.find().then((cities)=>{
//                 console.log(cities)
//                 cities.forEach(function (city, i, a) {
//                     console.log(city.id);
//                 });
//                 return cities
//             });

//             // return song.find().then( (songs)=> {
//             //     console.log(songs)
//             //     this.data.songs=songs.map((song)=>{
//             //         return {id:song.id,...song.attributes}
//             //     })
//             //     return songs

//                 // songs.forEach((song, i, a) =>{
//                 //     console.log(song.id);
//                 // });
            

//             // var query = new AV.Query('Song');
            
//             // return query.find().then( (songs)=> {
//             //     this.data.songs=songs.map((song)=>{
//             //         // return Object.assign({id:song.id},song.attributes)
//             //         return {id:song.id,...song.attributes}
//             //     })
//             //     return songs
//             // })
            
//         }
//     }

//     let controller={
//         init(view,model){
//             this.view=view
//             this.view.init()
//             this.model=model
//             let id=this.getPlaylistId()
//             this.model.find(id).then(()=>{
//                 this.view.render(this.model.data)
//             })
//         },
//         getPlaylistId(){
//             let search=window.location.search
//             if(search.indexOf("?")===0){
//                 search=search.substring(1)
//             }

//             let array=search.split('&').filter((v=>v))
//             let id=""
//             for(let i=0;i<array.length;i++){
//                 let kv=array[i].split('=')
//                 let k=kv[0]
//                 let v=kv[1]
//                 if(k==='id'){
//                     id=v
//                     break
//                 }
//             }
//             return id
            
//         }

//     }

//     controller.init(view,model)
// }
////
    // var GuangZhou = new AV.Object('City');// 广州
    // GuangZhou.set('name', '广州');
    // var GuangDong = new AV.Object('Province');// 广东
    // GuangDong.set('name', '广东');
    // GuangZhou.set('dependent', GuangDong);// 为广州设置 dependent 属性为广东
    // GuangZhou.save().then(function (guangZhou) {
    //     console.log(guangZhou.id);
    // });


    var GuangDong = AV.Object.createWithoutData('Province', '5bbcd19a9f54540070fec5b6');
    var query = new AV.Query('City');
    query.equalTo('dependent', GuangDong);
    query.find().then(function (cities) {
        cities.forEach(function (city, i, a) {
            console.log(city.id);
        });
    });