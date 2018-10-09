// {
//     let view={
//         el:".songlistTittle",
//         // template:`
//         // <div class="a">
            
//         // </div>
//         // `,

//         render(data){

//             console.log(data)
//             let playlist=data
            

           


//             // console.log(data)
//             // console.log(this.el)
//             // // this.template.replace("{{number}}",data.number)
//             // // this.template.replace("{{name}}",data.name)
//             // // $(this.el).append(this.template)
//             // // $(this.el).find('a').css({background:"url("+data.cover+")"})
//             // // $(this.el).find('.listCover').css({background:"url("+data.cover+")"})
//             // let playlist=data
//             // // Object.assign(playlist,data)
//             // console.log(playlist)
//             // console.log(data.name)
//             // this.template.replace('{{number}}',playlist.number)
//             // this.template.replace('{{name}}',playlist.name)
//             // // let $a=$(this.template
//             // //     .replace('{{number}}',playlist.name)
//             // //     .replace('{{name}}',playlist.singer)
//             // //     )
//             // this.$el.append(this.template)
            

//         }
//     }

//     let model={
//         data:{cover:"",name:"",number:''},
//         find(id){
//             var query = new AV.Query('Playlist');
//              query.get(id).then( (playlist)=>{
//                 return Object.assign(this.data,playlist.attributes)
                
//             }, function (error) {
                
//             });
//             // var playlist = AV.Object.createWithoutData('Playlist', id);
//             // console.log(playlist)
//             // playlist.fetch().then(function () {
//             //     var cover = playlist.get('cover');
//             //     this.data.name= playlist.get('name');
//             //     this.data.number= playlist.get('number');
//             // }, function (error) {
//             //     // 异常处理
//             // });

//         },
        
        
//     }

//     let controller={
//         init(view,model){
//             this.view=view
//             this.model=model
//             let id=this.getId()
//             this.model.find(id)
//             console.log(this.model.data)
//             this.view.render(this.model.data)
        
//         },
//         getId(){
//             let search=window.location.search
//             if(search.indexOf("?")===0){
//                 search=search.substring(1)
//             }
//             let array=search.split('&') .filter((v=>v))
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



{
    let view={
        el:'.songlistTittle',
        render(data){
            
            let {playlist}=data
            $(this.el).css({backgroundImage:`url(${playlist.cover})`})
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