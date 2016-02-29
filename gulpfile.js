const
    autoprefixer = require('gulp-autoprefixer'),
    cors = require('cors'),
    express = require('express'),
    gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

const port = process.env.PORT ? process.env.PORT : 8082;
const app = express();

gulp.task('server', function () {
    app.use(cors());
    app.use(express.static('./'));

    app.all('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'index.html'), {root: './'});
    });

    app.listen(port, '0.0.0.0', function onStart(err) {
        if (err) {
            console.log(err);
        }
        console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
    });
});

gulp.task('sass', function () {
    compileSass('app', 'css/_inc')
});

gulp.task('default', function () {
    gulp.watch('css/_inc/**/*.sass', ['sass']);
    gulp.start('server');
});

function compileSass(name, pathToSass) {
    gulp.src(pathToSass + '/' + name + '.sass')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass({
            loadPath: process.cwd() + pathToSass,
            style: 'nested',
            indentedSyntax: true,
            includePaths: pathToSass
        }))
        .pipe(autoprefixer({
            browsers: ['last 20 versions', '> 1%'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(notify(name + ' successfully compiled!'));
}

function onError(err) {
    notify.onError({
        title: 'Gulp',
        subtitle: 'Failure!',
        message: 'Error: <%= error.message %>'
    })(err);

    this.emit('end');
}