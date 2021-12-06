# AsciiDoc Templates for Red Hat Documentation

These templates aren't intended for use outside of Red Hat, but it is not prohibited.

## Previewing and Testing for non-devs

This repository is setup with [Tugboat.qa](https://www.tugboat.qa/), this gives us preview environments for each [pull request](https://github.com/redhataccess/adoc-templates/pulls) and our primary branches (`dev`, `qa`, and `main`). As well as giving us links for customers or QA to see updates, it also gives us visual diffs and some other features.

New PR's will make a preview environment automatically, and it will be removed when the PR is closed.

The below links to environments may change. If they links do not work please file an issue and tag @wesruv.

Here are the preview environments for our main branches, these show off the template output and associated front end assets for each preview environment:
* [QA Preview](https://qa-bqvgyjdniclupoxgavhruw5dqdfjrrqf.tugboat.qa/)
* [Stage Preview](https://stage-1cc7xy6fh2crvomrwrrbemgtezvibhxf.tugboat.qa/)
* [Prod Preview](https://main-xllavqyavo7am6oskahp4xyzozyxal1b.tugboat.qa/)

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
