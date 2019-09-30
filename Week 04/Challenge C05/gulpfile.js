const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const babelify = require("babelify");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("js", async function() {
  return browserify("./src/js/script.js")
    .transform("babelify", {
      presets: ["@babel/preset-env"]
    })
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/scripts"));
});

gulp.task("sass", async function() {
  return gulp
    .src("./src/styles/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/styles"));
});

gulp.task("watch", async () => {
  gulp.watch("./src/js/script.js", gulp.series("js"));
  gulp.watch("./src/styles/*.scss", gulp.series("sass"));
});

gulp.task("default", gulp.parallel("js", "sass", "watch"));
