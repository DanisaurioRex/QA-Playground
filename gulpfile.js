let gulp = require('gulp');
let gulpsync = require('gulp-sync')(gulp);
let clean = require('gulp-clean');
let typescript = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let fs = require('fs');
let allFeatures = 'features/**/*.feature';


let distFolder = 'dist';
let tsProject = typescript.createProject('./tsconfig.json');
let distFeatureFolder = 'dist/features';

gulp.task('build', gulpsync.sync(['clean', 'compile', 'copy_features']));

gulp.task('clean', function () {
    if (!fs.existsSync(distFolder)) {
        fs.mkdirSync(distFolder);
    }
    return gulp.src(distFolder + '/*', {read: false})
        .pipe(clean());
});

gulp.task('compile', function () {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy_features', function () {
  return gulp.src(allFeatures, {base: 'src'})
            .pipe(gulp.dest(distFeatureFolder));
});
