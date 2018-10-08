{
    let view={
        el:"songlistTittle",
        template:`
        <div class="listCover">
            <p>
                <svg class="icon headset" aria-hidden="true">
                    <use xlink:href="#icon-1"></use>
                </svg>
                {{number}}万
            </p> 
        </div>
        <div class="listTitle">{{playlist.name}}</div>

        `,

        render(data){

        }
    }

    let model={
        data:{cover:"",name:"",number:''},
        find(id){
            var playlist = AV.Object.createWithoutData('Playlist', id);
            playlist.fetch().then(function () {
                data.cover = playlist.get('cover');
                data.name= playlist.get('name');
                data.number= playlist.get('number');
            }, function (error) {
                // 异常处理
            });
        }
        
    }

    let controller={
        init(view,model){
            this.view=view
            this.model=model
            let id=this.getId()
            this.model.find(id).then(()=>{
                this.view.render(this.model.data)
            })
        },
        getId(){
            let search=window.location.search
            if(search.indexOf("?")===0){
                search=search.substring(1)
            }
            let array=search.split('&') .filter((v=>v))
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
