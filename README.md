# AsciiDoc Templates for Red Hat Documentation

## Installing tools for rendering the templates

1. Install Node JS/NPM version 12+, if you have [NVM](https://github.com/nvm-sh/nvm) installed you can type `nvm use` in the command line to use the same version as the repo authors.
2. [Install AsciiDoctor CLI](https://asciidoctor.org/docs/install-toolchain/), so `which asciidoctor` should give a response

Run:
```shell
npm install
```

This will also do a preliminary build using access.redhat.com's front-end assets.

## Manual Re-Build
```shell
npm run build
```

## Dev Build
This will build and reference the local version of the front-end assets, which may be more recent than what's on production.
```shell
npm run build
```

## Dev Watch Process
To work on the Sass/CSS, use:
```shell
npm run dev
```

This will start a local browser-sync server that:
* Automatically loads the `a-doc-styleguide.html`, which is generated from Pantheon's templates
* Will watch and compile (in dev mode) from updates on the adoc or haml files
* Reload the page if anything changes
* It will run on a port from your localhost that will show up in command line
