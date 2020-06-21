const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

// Compile scss into css
function style() {
  return src("src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
}

function serve(cb) {
  browserSync.init({
    server: {
      baseDir: "./src",
      index: "/index.html"
    }
  });

  watch("src/scss/**/*.scss", style);
  watch("src/*.html").on("change", browserSync.reload);
  watch("src/js/**/*.js").on("change", browserSync.reload);

  cb();
}

exports.style = style;
exports.default = series(serve);
