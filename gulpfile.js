var autoprefixer = require("gulp-autoprefixer"),
	gulp = require("gulp"),
	minifycss = require("gulp-minify-css"),
	notify = require("gulp-notify"),
	plumber = require("gulp-plumber"),
	rename = require("gulp-rename"),
	sass = require("gulp-sass");

var onError = notify.onError({
	title: "Your SASS is broken!",
	subtitle: "<%= file %> did not compile!",
	message: "<%= error.message %>"
});

function compileSass (name, pathToSass) {
	gulp.src(pathToSass + "/" + name + ".sass")
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass({
			loadPath: process.cwd() + pathToSass,
			style: "nested",
			indentedSyntax: true,
			includePaths: pathToSass
		}))
		.pipe(autoprefixer({
			browsers: ["last 20 versions", "> 1%"],
			cascade: false
		}))
		.pipe(gulp.dest("css"))
		.pipe(rename({suffix: ".min"}))
		.pipe(minifycss())
		.pipe(gulp.dest("css"))
		.pipe(notify(name + " successfully compiled!"));
}

gulp.task("sass", function () {
	compileSass("app", "css/_inc")
});

gulp.task("default", function () {
	gulp.watch("css/_inc/**/*.sass", ["sass"]);
});