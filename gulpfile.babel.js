import gulp from 'gulp';
import del from 'del';
import ts from 'gulp-typescript';

const filesToCopy = ['./package.json'];
const tsProject = ts.createProject('tsconfig.json');

const paths = {
  src: [...tsProject.config.include, ...filesToCopy],
  dest: tsProject.config.compilerOptions.outDir,
};

function copy() {
  return gulp.src(filesToCopy).pipe(gulp.dest(paths.dest));
}

function compile() {
  return tsProject
    .src()
    .pipe(tsProject())
    .js // compile TypeScript to JavaScript
    .pipe(gulp.dest(paths.dest));
}

function watch() {
  gulp.watch(paths.src, gulp.parallel(copy, compile));
}

export const clean = () => del([`${paths.dest}/**`, `!${paths.dest}`]);
export const build = gulp.series(clean, gulp.parallel(copy, compile));
export const dev = gulp.series(build, watch);

export default dev;
