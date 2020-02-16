(function (root) {
    function MyAudio () {
        this.audio = new Audio();
        this.status = 'pause';
    }
    MyAudio.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'playing';
        },
        pause: function() {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        playTo: function (per) {
            this.audio.currentTime = per;
        }
    }
    root.MyAudio = new MyAudio();
})(window.music || (window.music = {}))