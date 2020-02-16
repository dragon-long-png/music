(function (root) {
    function Control(index, len) {
        this.index = index || 0;
        this.len = len;
    }
    Control.prototype = {
        prev: function () {
            return this.getIndex(-1);
        },
        next: function () {
            return this.getIndex(1);
        },
        getIndex: function (val) {
            // 当前对应索引
            var index = this.index;
            // 数据总长度
            var len = this.len;
            this.index = (index + val + len) % len;
            return this.index;
        }
    }
    root.controlIndex = Control;
})(window.music || (window.music = {}))