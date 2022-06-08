import gulp from 'gulp';
import del from 'del';
import ts from 'gulp-typescript';

const tsProject = ts.createProject('tsconfig.json');

const paths = {
  src: [...tsProject.config.include],
  dest: tsProject.config.compilerOptions.outDir
};

function compile() {
  return tsProject
    .src()
    .pipe(tsProject())
    .js // compile TypeScript to JavaScript
    .pipe(gulp.dest(paths.dest));
}

function watch() {
  gulp.watch(paths.src, compile);
}

export const clean = () => del([`${paths.dest}/**`, `!${paths.dest}`]);
export const build = gulp.series(clean, compile);
export const dev = gulp.series(build, watch);

export default dev;
