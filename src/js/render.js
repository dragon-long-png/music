(function (root) {
    root.render = function (data) {
        renderImage(data.image);
        renderSongInfo(data);
        renderLike(data.isLike);
    };
    /**
     * 图片渲染
     * @param {*} src 
     */
    function renderImage(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $('.song-avatar img').attr('src', src);
            root.blurImg(img, $('body'));
        }
    }
    /**
     * 渲染歌曲信息
     * @param {}} data 
     */
    function renderSongInfo(data) {
        var str = '<p class="song-name">'+data.song+'</p><p class="song-singer">'+data.singer+'</p><p class="song-album">'+data.album+'</p>'
        $('.song-info').html(str)
    }
    function renderLike(isLike) {
        if(isLike) {
            $('.like').addClass('liked');
        } else {
            $('.like').removeClass('liked');
        }
    }
})(window.music || (window.music = {}))