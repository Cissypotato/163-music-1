{
    let view={
        el:".formWrapper",
        template:`
            <form action="post" class="playlistForm">
                <div class="inputs">
                    <div class="row">
                        <label>
                            歌单名                        
                        </label>
                        <input name="name" type="text" value="--name--">
                    </div>

                    <div class="row">
                        <label>
                           封面                       
                        </label>
                        <input name="cover" type="text" value="--cover--">
                    </div>
                    
                </div>

                <div class="submitButton">
                    <button type="submit">保存</button>
                </div>   
            </form>       
        `,
        init(){
            this.$el=$(this.el)
        },
        render(data={}){
            let palceHolder=['name','cover']
            let html=this.template
            palceHolder.map((string)=>{
                html=html.replace(`--${string}--`,data[string] ||'')
            })
            $(this.el).html(html)
            // if(data.id){
            //     $(this.el).prepend('<h2>编辑歌曲</h2>')
            // }else{
            //     $(this.el).prepend('<h2>新建歌曲</h2>')
            // }
        },
        reset(){
            this.render()
        },
        
    }

    let model={
        data:{
            name:'',id:'',cover:''
        },
        update(data){
            var playlist = AV.Object.createWithoutData('Song', this.data.id);
            playlist.set('name', data.name);
            playlist.set('cover', data.cover);
            return playlist.save()
                .then((response)=>{
                    Object.assign(this.data,data)
                    return response
                });
        },
        create(data){
            var Playlist = AV.Object.extend('Playlist');
            var playlist = new Playlist();
            playlist.set('name', data.name);
            playlist.set('cover', data.cover);
            return playlist.save().then( (newPlaylist)=> {
                let{id,attributes}=newPlaylist
                Object.assign(this.data,{id,...attributes})
            }, (error) =>{
            // 异常处理
            console.error('Failed to create new object, with error message: ' + error.message);
            });
        },
    }



    let controller={
        init(view,model){
            this.view=view
            this.model=model
            this.view.render(this.model.data)
            this.view.init()
            this.bindEvents()
            window.eventHub.on('select',(data)=>{
                this.model.data=data
                this.view.render(this.model.data)
            })
            window.eventHub.on('new',(data)=>{
                if(this.model.data.id){
                    this.model.data={
                        name:'',cover:''
                    }
                }else{
                    Object.assign(this.model.data,data)
                }             
                this.view.render(this.model.data)
            })
        },
        reset(data){
            this.view.render(data)
        },
        create(){
            let needs='name cover'.split(' ')
            let data={}
            needs.map((string)=>{
                data[string]=this.view.$el.find(`[name="${string}"]`).val()
            })
           this.model.create(data)
            .then(()=>{
                this.view.reset()
                let string=JSON.stringify(this.model.data)
                let object=JSON.parse(string )
                window.eventHub.emit('create',object)
            })
        },
        update(){
            
            let needs='name cover'.split(' ')
            let data={}
            needs.map((string)=>{
                data[string]=this.view.$el.find(`[name="${string}"]`).val()
            }) 
            this.model.update(data)
                .then(()=>{
                    window.eventHub.emit('update',JSON.parse(JSON.stringify(this.model.data)))
                })
            
        },
        bindEvents(){
            this.view.$el.on('submit','form',(e)=>{
                e.preventDefault()
                if(this.model.data.id){
                    this.update()
                }else{
                    this.create()
                }   
            })
        }
    }
    controller.init(view,model)
}