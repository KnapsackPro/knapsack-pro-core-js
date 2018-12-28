import gulp from 'gulp';
import del from 'del';
import ts from 'gulp-typescript';

const filesToCopy = ['./package.json'];
const tsProject = ts.createProject('tsconfig.json');

const paths = {
  src: [...tsProject.config.include, ...filesToCopy],
  dest: tsProject.config.compilerOptions.outDir,
};

export function clean() {
  return del([`${paths.dest}/**`, `!${paths.dest}`]);
}

export function copy() {
  return gulp.src(filesToCopy).pipe(gulp.dest(paths.dest));
}

export function compile() {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest(paths.dest));
}

export function watch() {
  gulp.watch(paths.src, gulp.parallel(copy, compile));
}

export const build = gulp.series(clean, copy, compile, watch);

export default build;
