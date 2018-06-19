{
    let view={
        el:".page>main",
        template:`
            <form action="post" class="musicForm">
                <div class="row">
                    <label>
                        歌名
                        <input name="name" type="text" value="--name--">
                    </label>
                </div>
                <div class="row">
                    <label>
                        歌手
                        <input name="singer" type="text" value="--singer--">
                    </label>
                </div>
                <div class="row">
                    <label>
                        外链
                        <input name="url" type="text" value="--url--">
                    </label>
                </div>
                <div class="row">
                    <button type="submit">保存</button>
                </div>
            </form>           
        `,
        init(){
            this.$el=$(this.el)
        },
        render(data={}){
            let palceHolder=['name','singer','url','id']
            let html=this.template
            palceHolder.map((string)=>{
                html=html.replace(`--${string}--`,data[string] ||'')
            })
            $(this.el).html(html)
            if(data.id){
                $(this.el).prepend('<h2>编辑歌曲</h2>')
            }else{
                $(this.el).prepend('<h2>新建歌曲</h2>')
            }
        },
        reset(){
            this.render()
        },
        
    }

    let model={
        data:{
            name:'',singer:'',url:"",id:''
        },
        update(data){
            var song = AV.Object.createWithoutData('Song', this.data.id);
            song.set('name', data.name);
            song.set('url', data.url);
            song.set('singer', data.singer);
            return song.save()
                .then((response)=>{
                    Object.assign(this.data,data)
                    return response
                });
        },
        create(data){
            var Song = AV.Object.extend('Song');
            var song = new Song();
            song.set('name', data.name);
            song.set('singer', data.singer);
            song.set('url', data.url);
            return song.save().then( (newSong)=> {
                let{id,attributes}=newSong
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
                        name:'',singer:'',url:"",id:''
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
            let needs='singer name url'.split(' ')
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
            
            let needs='singer name url'.split(' ')
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