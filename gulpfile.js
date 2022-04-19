const {src, dest, task, series, watch, parallel} = require("gulp");
const rm = require('gulp-rm');

const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('node-sass');

const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries'); // это тоже херня
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const {SRC_PATH, DIST_PATH, FONTS_PATH, IMG_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;
const sourcemaps = require('gulp-sourcemaps');
const webp = require("gulp-webp");




task('img-convert',
    () => {
        return src(['src/img/*','!src/img/*.svg'])
            .pipe(webp({quality: 80}))
            .pipe(dest("./dist/img"));
    }
);
task(
    'clean',
    () => {
        return src(`${DIST_PATH}/**/*`,{ read: false }).pipe(rm())
    })
task(
    'copy:html',
    () => {
        return src(`${SRC_PATH}/index.html`).pipe(dest('dist')).pipe(reload({ stream: true}));
    })
task(
    'copy:php',
    () => {
        return src(`${SRC_PATH}/*.php`).pipe(dest('dist')).pipe(reload({ stream: true}));
    })
task(
    'copy:img',
    () => {
        return src(`${SRC_PATH}/img/**`).pipe(dest('dist/img'));
    })
task(
    'copy:svg',
    () => {
        return src(`${SRC_PATH}/img/*.svg`).pipe(dest('dist/img'));
    })
task(
    'copy:fonts',
    () => {
        return src(FONTS_PATH).pipe(dest('dist/fonts'));
    })


task(
    'styles',
    () => {
        return src(STYLE_LIBS,{allowEmpty:true})
            .pipe(gulpif(env === 'dev',sourcemaps.init()))
            .pipe(concat("main.min.scss"))
            .pipe(sass().on("error", sass.logError))
            .pipe(gulpif(env === 'prod',autoprefixer({
                browsers: ["last 2 versions"],
                cascade: false
            })))
            //.pipe(gulpif(env === 'prod', gcmq())) и это херня
            .pipe(gulpif(env === 'prod', cleanCSS()))
            .pipe(gulpif(env === 'dev', sourcemaps.write()))
            .pipe(dest("dist"))
            .pipe(reload({ stream: true}));
    })

task(
    'scripts',
    () => {
        return src(JS_LIBS)
            .pipe(concat("script.min.js",{newLine: ';'}))
            .pipe(gulpif(env === 'prod', babel({
                presets: ['@babel/env'],
                compact: false
            })))
            .pipe(gulpif(env === 'prod', uglify()))
            .pipe(dest("dist"))
            .pipe(reload({ stream: true}));
    })




task(
    'server',
    () => {
        browserSync.init({
            server: {
                baseDir: "./dist"
            }

        });
    });
task(
    'watch', () => {
        watch(STYLE_LIBS, series("styles"));
        watch(`${SRC_PATH}/index.html`, series("copy:html"));
        watch(`${SRC_PATH}/*.php`, series("copy:php"));
        watch(`${SRC_PATH}/img/**`, series("copy:img"));
        watch(`${SRC_PATH}/img/*.svg`, series("copy:svg"));
        watch(FONTS_PATH, series("copy:fonts"));
        watch(JS_LIBS, series("scripts"));
    });

task('build',
    series(
        'clean',
        parallel('copy:html', "copy:svg", 'copy:img', "copy:fonts", 'styles', 'copy:php', 'scripts'), parallel("server"))
);

task("default", series("clean", parallel("copy:html", "copy:svg", "copy:img", "copy:fonts", "styles", 'copy:php',"scripts"), parallel('watch',"server")));
