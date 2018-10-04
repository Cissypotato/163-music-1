{
    let view={
        el:'section.remdPlaylist',
        template:`
        <a href="songList.html?id={{songlist.id}}">
            <div class="playlistCover">
                <img src="{{songlist.cover}}" alt="">
                <p>
                    <svg class="icon headset" aria-hidden="true">
                        <use xlink:href="#icon-1"></use>
                    </svg>
                    132万
                </p>                           
            </div>
            <p>{{songlist.summary}}</p>
        </a>
            
        `
    }
    let model={}
    let controller={}
}