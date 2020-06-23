const { src, dest, watch, series } = require("gulp");
<% if (isPrecompiled) { %>const sass = require("gulp-sass");<% } %>
const browserSync = require("browser-sync").create();

<% if (!isPrecompiled && includeBootstrap) { %>
// Copy Bootstrap files
function copyBootstrap() {
    return src("./node_modules/bootstrap/dist/css/bootstrap.min.css").pipe(
      dest("src/css")
    );
  }
<% } %>
// Compile <%= preprocesorExtension.toLowerCase() %> files
function style() {
  return src("src/<%= preprocesorExtension.toLowerCase() %>/**/*.<%= preprocesorExtension.toLowerCase() %>")
  <% if (isPrecompiled) { %>
    .pipe(sass().on("error", sass.logError)) 
    .pipe(dest("src/css"))
  <% } %>
    .pipe(browserSync.stream());
}

<% if(includeBootstrap) { %>
// Copy JS file dependencies to final JS folder
function cpScript() {
    return src([
      "./node_modules/jquery/dist/jquery.min.js",
      "./node_modules/popper.js/dist/popper.min.js",
      "./node_modules/bootstrap/dist/js/bootstrap.min.js"
    ]).pipe(dest("src/js"));
  }
  <% } %>

// Initialize the server
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
<% if(includeBootstrap) { %>exports.scripts = cpScript;<% } %>
<% if (!isPrecompiled && includeBootstrap) { %>exports.bootstrap = copyBootstrap;<% } %>
exports.default = series(<% if (!isPrecompiled && includeBootstrap) { %>copyBootstrap, <% } %>style, <% if(includeBootstrap) { %>cpScript, <% } %>serve);
