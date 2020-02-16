(function (root) {
    var dur = 0,
        frameId,
        startTime,
        prevTime = 0;

    /**
     * 时间渲染
     * @param {} times 
     */
    function renderAllTime(times) {
        dur = times;
        times = formatTime(times);
        prevTime = 0;
        $('.alltime').text(times);
    }
    /**
     * 时间格式化
     * @param {*} times 
     */
    function formatTime(times) {
        times = Math.round(times);
        var minutes = Math.floor(times / 60);
        var seconds = times - minutes * 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return minutes + ':' + seconds
    }
    /**
     * 音乐播放，
     */
    function startAudio(p) {
        prevTime = p == undefined ? prevTime : p
        startTime = new Date().getTime();

        function frame() {
            var curTime = new Date().getTime();
            var per = prevTime + (curTime - startTime) / (dur * 1000);
            if(per < 1) {
                update(per);
                frameId = requestAnimationFrame(frame);
            } else {
                cancelAnimationFrame(frameId);
                $('.next').trigger('click');
            }
        }
        frame();
    }

    /**
     * 音乐暂停
     */
    function stopAudio() {
        var stopTime = new Date().getTime();
        var temp = (stopTime - startTime) / (dur * 1000);
        cancelAnimationFrame(frameId);
        prevTime += temp;
    }
    /**
     * 动态样式，时间，进度条
     * @param {*} per 
     */
    function update(per) {
        var curTime = per * dur;
        curTime = formatTime(curTime);
        $('.curtime').text(curTime);
        /**
         * per 0    -100%
         * per 30   -70%
         */
        var p = (per - 1) * 100 + '%';
        $('.pro-top').css('transform', 'translateX(' + p + ')')
    }
    root.pro = {
        renderAllTime: renderAllTime,
        startAudio: startAudio,
        stopAudio: stopAudio,
        update: update
    }
})(window.music || (window.music = {}))