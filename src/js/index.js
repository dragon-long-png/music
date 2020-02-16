var index = 0,
    len = 0,
    songArr = [],
    music = window.music,
    timer,
    controlIndex = null,
    offset = $('.pro-bottom').offset(),
    left = offset.left,
    width = $('.pro-bottom').width();

/**
 * 数据获取
 * @param {*} url 
 */
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (res) {
            songArr = res;
            len = res.length - 1;
            music.render(songArr[index]);
            renderSongList(res)
            music.MyAudio.getAudio(songArr[index].audio);
            controlIndex = new music.controlIndex(index, res.length);
            music.pro.renderAllTime(songArr[index].duration);
        }
    })
}
getData('../mock/data.json');

/**
 * 歌词列表渲染，点击切歌
 * @param {} data 
 */
function renderSongList(data) {
    for (var i = 0; i < data.length; i++) {
        var li = document.createElement('li');
        li.innerText = data[i].song + ' - ' + data[i].singer;
        li.setAttribute('data-index', i);
        if(index === i) {
            li.className = 'active';
        }
        (function (i) {
            li.onclick = function () {
                music.render(songArr[i]);
                music.MyAudio.getAudio(songArr[i].audio);
                music.MyAudio.play();
                music.pro.startAudio(0);
                $('.play').addClass('playing');
                changeIndex(i);
                $('.close').trigger('click');
            }
        })(i)
        $('.songs-list').append(li);
    }
}
/**
 * 歌曲切换，公共代码提取
 */
$('body').on('play:change', function (e, index) {
    music.render(songArr[index]);
    music.MyAudio.getAudio(songArr[index].audio);
    music.pro.renderAllTime(songArr[index].duration);
    if (music.MyAudio.status === 'playing') {
        music.MyAudio.play();
        music.pro.startAudio(0);
        rotateAvatar(0);
    } else {
        music.pro.update(0);
    }
    $('.song-avatar').attr('data-deg', 0);
    $('.song-avatar').css({
        'transform': `rotateZ(0deg)`,
        'transition': 'none'
    });
    changeIndex(index)
})
// 歌词列表选中渲染
function changeIndex(curIndex){
    var li = $('.songs-list li');
    for(var i = 0; i< li.length; i++) {
        li[i].className = '';
    }
    li[curIndex].className = 'active';
    index = curIndex;
    controlIndex = new music.controlIndex(index, len + 1);
    rotateAvatar(0);
}
/**
 * 上一首
 */
$('.prev').on('click', function () {
    index = controlIndex.prev();
    $('body').trigger('play:change', index);
})
/**
 * 下一首
 */
$('.next').on('click', function () {
    index = controlIndex.next();
    $('body').trigger('play:change', index);
})
/**
 * 播放/暂停
 */
$('.play').on('click', function () {
    if (music.MyAudio.status === 'pause') {
        music.MyAudio.play();
        music.pro.startAudio();
        var curDeg = $('.song-avatar').attr('data-deg') || 0;
        rotateAvatar(curDeg);
    } else {
        clearInterval(timer);
        music.MyAudio.pause();
        music.pro.stopAudio();
    }
    $('.play').toggleClass('playing');
})
/**
 * 喜欢
 */
$('.like').on('click', function () {
    songArr[index].isLike = !songArr[index].isLike;
    $('.like').toggleClass('liked');
});

$('.list').on('click', function () {
    $('.music-list').addClass('checked');
})

$('.close').on('click', function () {
    $('.music-list').removeClass('checked');
})

/**
 * 头像旋转
 * @param {*} deg 
 */
function rotateAvatar(deg) {
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function () {
        deg += 2;
        $('.song-avatar').css({
            'transform': `rotateZ(${deg}deg)`,
            'transition': 'all 0.2s ease-out'
        }).attr('data-deg', deg);
    }, 200);

}

$('.squre').on('touchstart', function () {
    music.pro.stopAudio();
}).on('touchmove', function (e) {
    var x = e.changedTouches[0].clientX;
    var curX = x - left;
    var per = curX / width;
    if (per >= 0 && per <= 1) {
        music.pro.update(per);
    }
}).on('touchend', function (e) {
    var x = e.changedTouches[0].clientX;
    var curX = x - left;
    var per = curX / width;
    var curTime = per * songArr[index].duration;
    if (per >= 0 && per <= 1) {
        music.MyAudio.playTo(curTime);
        music.pro.startAudio(per);
        music.MyAudio.play();
        $('.play').addClass('playing');
    }
})