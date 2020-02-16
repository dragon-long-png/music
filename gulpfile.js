var gulp = require('gulp');

var folder = {
    src: 'src/',
    dist: 'dist/'
};

//html压缩
var htmlClean = require('gulp-htmlclean');

//图片压缩
var imageMin = require('gulp-imagemin');

//js压缩
var uflify = require('gulp-uglify');

//去掉js中的调试语句
var stripDebug = require('gulp-strip-debug');

//将less转换为css
var lessToCss = require('gulp-less');

//自动添加css前缀
var postCss = require('gulp-postcss');

var autoPreFixer = require('autoprefixer');

//压缩css
var cleanCss = require('gulp-clean-css');

//开启服务器
var connect = require('gulp-connect');

//环境变量区分
var isMod = process.env.NODE_ENV === 'development';

gulp.task('html', function () {
    var setting = gulp.src(folder.src + "html/*")
        .pipe(connect.reload())
    if (!isMod) {
        setting.pipe(htmlClean())
    }
    setting.pipe(gulp.dest(folder.dist + "html/"));
});

gulp.task('image', function () {
    gulp.src(folder.src + "image/*")
        .pipe(connect.reload())
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "image/"))
})

gulp.task('css', function () {
    var setting = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(lessToCss())
        .pipe(postCss([autoPreFixer()]))
    if (!isMod) {
        setting.pipe(cleanCss())
    }
    setting.pipe(gulp.dest(folder.dist + "css/"));
});

gulp.task('js', function () {
    var setting = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
    if (!isMod) {
        setting.pipe(stripDebug())
        setting.pipe(uflify())
    }
    setting.pipe(gulp.dest(folder.dist + "js/"));
});

gulp.task('server', function () {
    connect.server({
        port: 8888,
        livereload: true
    })
});

gulp.task('watch', function () {
    gulp.watch(folder.src + "html/*", ['html'])
    gulp.watch(folder.src + "css/*", ['css'])
    gulp.watch(folder.src + "js/*", ['js'])
})

gulp.task('default', ['html', 'css', 'js', 'server', 'watch', 'image']);