var autoprefixer = require('gulp-autoprefixer'),
	express = require('express'),
	gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass');

gulp.task('staticServer', function () {
	var server = express(),
		port = 9090;

	server.use(express.static('./'));
	server.all('/*', function (req, res) {
		res.sendFile('index.html', {root: './'});
	});

	server.listen(port);
	console.log('Express static server running for openmaths-static on port ' + port);
});

gulp.task('sass', function () {
	compileSass('app', 'css/_inc')
});

gulp.task('default', function () {
	gulp.watch('css/_inc/**/*.sass', ['sass']);
	gulp.start('staticServer');
});

function compileSass (name, pathToSass) {
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