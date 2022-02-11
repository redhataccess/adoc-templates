/* eslint-env node, es6 */
/* global require */
'use strict';

/**
 * Configuration
 */

// Load dependencies
const
  {
    parallel,
    series,
    src,
    dest,
    task,
    watch,
  } = require('gulp'),
  gulpIf = require('gulp-if'),
  sourceMaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass')(require('sass')),
  sassGlobbing = require('gulp-sass-globbing'),
  postCss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssNano = require('cssnano'),
  pxToRem = require('postcss-pxtorem'),
  stylelint = require('gulp-stylelint'),
  shell = require('gulp-shell'),
  browserSync = require('browser-sync').create();;

const isDev = process.env.NODE_ENV === 'dev';


// File locations
const asciiDocTemplates = 'templates';

const startBrowserSync = (done) => {
  browserSync.init({
    'server': './',
    'index': './index.html',
    'ui': false,
  });
  done();
};

const reloadBrowserSync = (done) => {
  browserSync.reload();
  done();
};

// Will be used to ignore globbed files later
let globbedScssFiles = Array();

/**
 * Helper with standard globbing config
 *
 * @param {string} folderName Name of folder to glob
 * @param {string} fileName Path (in scss/) to create a partial in the scss folder, e.g. _layout.scss or core/_mixins.scss
 */
 const globScssFolder = (folderName, fileName) => {
  // No idea why, but array methods don't work... but this does.
  if (Object.values(globbedScssFiles).indexOf(`scss/${fileName}`) === -1) {
    globbedScssFiles.push(`scss/${fileName}`);
  }

  // Only glob partials
  return src(`scss/${folderName}/**/_*.scss`)
  .pipe(
    sassGlobbing(
      {'path': fileName,},
      {
        'useSingleQuotes': true,
        'signature': '// Generated with gulp-sass-globbing',
      }
    )
  )
  .pipe(dest('scss'));
};

// Need an anon function so we can call a function that needs params
// Making a var so the gulp output will be more informative
const globBaseScss = () => globScssFolder('20_base', '_base.scss');
const globComponentsScss = () => globScssFolder('30_components', '_components.scss');
const globLayoutScss = () => globScssFolder('40_layout', '_layout.scss');

const globScss = parallel(
  globBaseScss,
  globComponentsScss,
  globLayoutScss
);

/**
 * Compile an SCSS file to CSS
 * @param {String} source File path
 * @param {String} output File path
 */
const processScss = (source) =>
  src(source)
  // Lint first
  .pipe(stylelint({
    reporters: [
      {
        formatter: 'string',
        console: true,
        failAfterError: false,
      }
    ]
  }))
  // Start compiling
  .pipe(gulpIf(isDev, sourceMaps.init()))
  .pipe(sass().on('error', sass.logError))
  .pipe(
    postCss([
      pxToRem({
        'propList': ['*',],
      }),
      autoprefixer(),
    ])
  )
  // Minify if production build
  .pipe(gulpIf(!isDev, postCss([cssNano(),])))
  .pipe(dest('examples/'))
  .pipe(sourceMaps.write())
  .pipe(dest('dist/'));

const compileRhDocs = () => processScss('scss/rhdocs.scss');
const globAndCompileRhDocs = series(globScss, compileRhDocs);

const compileAsciiDoc = (path, env) =>  {
  return shell.task(`asciidoctor -T ${asciiDocTemplates} -a pantheonenv=${env} ${path}`);
}

const compileAllAsciiDocs = (env) => series(
  compileAsciiDoc('examples/ascii-doc-styleguide.adoc', env),
  compileAsciiDoc('examples/code-samples.adoc', env),
  compileAsciiDoc('examples/assembly_access-control-list.adoc', env),
  compileAsciiDoc('examples/demo-assembly.adoc', env),
);

const watchTasks = () => {
  watch(
    `${asciiDocTemplates}/**/*.haml`,
    series(
      compileAllAsciiDocs('localdev'),
      reloadBrowserSync
    )
  );

  watch(
    'examples/**/*.adoc',
    series(
      compileAllAsciiDocs('localdev'),
      reloadBrowserSync
    )
  );

  // Don't watch globbed files to avoid an infinite loop
  const watchedScss = globbedScssFiles.map(file => `!${file}`);
  watchedScss.unshift('scss/**/*.scss');

  watch(
    watchedScss,
    series(
      globAndCompileRhDocs,
      reloadBrowserSync
    )
  )
};

/**
 * Gulp tasks
 */
// Will use frontend assets from prod
exports.default = series(
  globAndCompileRhDocs,
  compileAllAsciiDocs('localdev')
);

// Starts browsersync, watches project for changes and reloads all browsers
task('watch',
  series(
    parallel(
      compileAllAsciiDocs('localdev'),
      globAndCompileRhDocs
    ),
    parallel(
      startBrowserSync,
      watchTasks
    )
  )
);
