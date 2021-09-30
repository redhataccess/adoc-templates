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
    // src,
    // dest,
    task,
    watch,
  } = require('gulp'),
  shell = require('gulp-shell'),
  browserSync = require('browser-sync').create();

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
};

/**
 * Gulp tasks
 */
// Will use frontend assets from prod
task('default',
  compileAllAsciiDocs('localdev')
);

// Will use local frontend assets
task('build:dev',
  compileAllAsciiDocs('localdev')
);

// Starts browsersync, watches project for changes and reloads all browsers
task('watch',
  series(
    compileAllAsciiDocs('localdev'),
    parallel(
      startBrowserSync,
      watchTasks
    )
  )
);
