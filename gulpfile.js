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
    'index': './examples/ascii-doc-styleguide.html',
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

const compileAllAsciiDocs = (env) => {
  return [
    compileAsciiDoc('examples/ascii-doc-styleguide.adoc', env),
    compileAsciiDoc('examples/assembly_access-control-list.adoc', env),
  ]
}


const watchTasks = () => {
  watch(
    `${asciiDocTemplates}/**/*.haml`,
    series(
      compileAllAsciiDocs,
      reloadBrowserSync
    )
  );

  watch(
    'examples/**/*.adoc',
    series(
      compileAllAsciiDocs,
      reloadBrowserSync
    )
  );
};

/**
 * Gulp tasks
 */
// Will use frontend assets from prod
task('default',
  parallel(...compileAllAsciiDocs('prod'))
);

// Will use local frontend assets
task('build:dev',
  parallel(...compileAllAsciiDocs('localdev'))
);

// Starts browsersync, watches project for changes and reloads all browsers
task('watch',
  series(
    'build:dev',
    parallel(
      startBrowserSync,
      watchTasks
    )
  )
);
