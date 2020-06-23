const { src, dest, watch, series } = require("gulp");
<%_ if (isPrecompiled) { %><%_ if (preprocesorExtension === "SASS" || preprocesorExtension === "SCSS") { %>
const sass = require("gulp-sass");<% _} %><%_ if (preprocesorExtension === "LESS") { %>
const less = require("gulp-less");
const path = require("path");<% } _%><% } _%>
const browserSync = require("browser-sync").create();

// Compile scss into css
function style() {
  return src("src/<%= preprocesorExtension.toLowerCase() %>/**/*.<%= preprocesorExtension.toLowerCase() %>")
  <%_ if (isPrecompiled) { %>
    <%_ if (preprocesorExtension === "SASS" || preprocesorExtension === "SCSS") { %>
    .pipe(sass().on("error", sass.logError)) 
    <% } _%>
    <%_ if (preprocesorExtension === "LESS") { %>
        .pipe(less({
            paths: [path.join(__dirname, '<%= preprocesorExtension.toLowerCase() %>', 'includes')]
        }))
    <% } _%>
    .pipe(dest("src/css"))
  <% } _%>
    .pipe(browserSync.stream());
}

function serve(cb) {
  browserSync.init({
    server: {
      baseDir: "./src",
      index: "/index.html"
    }
  });

  watch("src/<%= preprocesorExtension.toLowerCase() %>/**/*.<%= preprocesorExtension.toLowerCase() %>", style);
  watch("src/*.html").on("change", browserSync.reload);
  watch("src/js/**/*.js").on("change", browserSync.reload);

  cb();
}

exports.style = style;
exports.default = series(serve);
