var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var ts = require("gulp-typescript");
var tsify = require("tsify");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var gutil = require('gulp-util');
var paths = {
  pages: ["src/public/*.html"],
};

uglify().on('error', function(err) {
	gutil.log(gutil.colors.red('[Error]'), err.toString());
	this.emit('end');
})

function copy_html() {
	return gulp.watch(paths.pages, () => {
		gulp.src(paths.pages).pipe(gulp.dest("./dist/public"))
	}) 
	
}

function public_ts() {
	return gulp.watch("./src/public/scripts/*", () => {
		return browserify({
			basedir: "./src/public/scripts",
			debug: true,
		})
		.plugin(tsify)
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("./dist/public/scripts"))
	})
}

function server_ts() {
	return gulp.watch("./src/*.ts", () => {
		var tsProject = ts.createProject("./src/tsconfig.json");
		return tsProject.src()
			.pipe(tsProject()).js
			.pipe(gulp.dest("./dist"));
	})
}

function stuffs() {
	return browserify({
		basedir: ".",
		debug: true,
		entries: ["src/main.ts"],
		cache: {},
		packageCache: {},
	})
		.plugin(tsify)
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("dist"))
}

exports.default = gulp.parallel(copy_html, public_ts, server_ts)