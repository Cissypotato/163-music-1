{
    let view={
        el:".page>main",
        template:`
            <form action="post" class="musicForm">
                <h2>新建歌曲</h2>
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
        },
        reset(){
            this.render()
        }
        
    }

    let model={
        data:{
            name:'',singer:'',url:"",id:''
        },
        create(data){
            // 声明一个 Todo 类型
            var Song = AV.Object.extend('Song');
            // 新建一个 Todo 对象
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
            window.eventHub.on('upload',(data)=>{
                this.model.data=data
                this.reset(this.model.data)
            })
        },
        reset(data){
            this.view.render(data)
        },
        bindEvents(){
            this.view.$el.on('submit','form',(e)=>{
                e.preventDefault()
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
                
            })
        }
    }
    controller.init(view,model)
}