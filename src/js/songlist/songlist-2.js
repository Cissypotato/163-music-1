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
        
    }

    let controller={

    }

    // controller.init(view,model)
}